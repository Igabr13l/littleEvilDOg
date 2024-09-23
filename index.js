// Dependencia WebSocket
const WebSocket = require('ws');
const { scrape } = require('./src');
const { initEnv, Config } = require('docenv');
const config = require('../docenv-config.js');

initEnv(config);

// Variables globales
let ws;
let isRunning = false;

// Simulación de funciones que podría ejecutar el script
const functionMap = {
  scrape,
  fakeScrape: async (user, data) => {
    console.log('Fake scraping data...');
    console.log(user)
    console.log(data)
    return 'Fake data functs';
  }
};

let IsWSConnected = false;
// Inicializar el WebSocket
function initWebSocket() {
  ws = new WebSocket(Config.URL_WS); // Cambia por la URL del mainProgram

  // necesito saber si esta conectado, si lo esta IsWSConnected cambia a true
  ws.on('open', () => {
    console.log('Connected to mainProgram');
    IsWSConnected = true;
    sendMessage({ type: 'ready', message: 'Script is ready to execute instructions' });
  });

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    handleMainProgramMessage(data);
  });

  ws.on('close', () => {
    console.log('Disconnected from mainProgram');
    IsWSConnected = false
    setTimeout(() => {
      if (!IsWSConnected) initWebSocket();
    }, 5000);
  });

  ws.on('error', () => {
    // el websocket intentara volver a conectarse a la url cada 5 segundos hasta que lo consiga
    console.log('Error connecting to mainProgram');
    IsWSConnected = false
    setTimeout(() => {
      if (!IsWSConnected) initWebSocket();
    }, 5000);
  });
}

// Enviar mensaje al `mainProgram`
function sendMessage(data) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  }
}

// Manejar la comunicación con el `mainProgram`
function handleMainProgramMessage(message) {
  const { type, data } = message;
  console.log(message)
  switch (type) {
    case 'start':
      if (functionMap[data.functionName]) {
        isRunning = true;
        console.log(`Executing function: ${data.functionName}`);
        executeFunction(data.functionName, data.args);
      } else {
        console.error(`Unknown function ${data.functionName}`);
        sendMessage({ type: 'error', data: { message: `Unknown function ${data.functionName}` } });
      }
      break;
    case 'stop':
      console.log('Stopping script execution');
      isRunning = false;
      sendMessage({ type: 'stopped', message: 'Script execution stopped' });
      ws.close();
      break;
    case 'connected':
      console.log('Connected to mainProgram');
      break;
    default:
      console.error(`Unknown message type: ${type}`);
      break;
  }
}

// Ejecutar la función solicitada por el `mainProgram`
async function executeFunction(functionName, args) {
  try {
    const result = await functionMap[functionName](...args);
    console.log(`Function ${functionName} executed with result: ${result}`);
    sendMessage({ type: 'result', data: { functionName, result } });
  } catch (error) {
    console.error(`Error executing function ${functionName}: ${error.message}`);
    sendMessage({ type: 'error', message: `Error executing function ${functionName}`, error: error.message });
  }
}

// Iniciar la conexión al WebSocket
initWebSocket();

// Cerrar el script manualmente si es necesario
process.on('SIGINT', () => {
  console.log('Closing script...');
  if (ws) ws.close();
  process.exit();
});