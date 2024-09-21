// Dependencia WebSocket
const WebSocket = require('ws');
const { scrape } = require('./src');
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

// Inicializar el WebSocket
function initWebSocket() {
  ws = new WebSocket('ws://0.tcp.sa.ngrok.io:18630'); // Cambia por la URL del mainProgram

  ws.on('open', () => {
    console.log('Connected to mainProgram');
    sendMessage({ type: 'ready', message: 'Script is ready to execute instructions' });
  });

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    handleMainProgramMessage(data);
  });

  ws.on('close', () => {
    console.log('Disconnected from mainProgram');
    isRunning = false;
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