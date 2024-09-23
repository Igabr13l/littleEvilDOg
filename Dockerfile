# Usa una imagen base de Node.js 20
FROM node:20-bullseye-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias necesarias del sistema para Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    libxss1 \
    libnss3 \
    libasound2 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxi6 \
    libxrandr2 \
    libxdamage1 \
    libgbm1 \
    libgtk-3-0 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdrm2 \
    libxshmfence1 \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Establece la variable de entorno para Puppeteer para usar Chromium instalado por el sistema
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación al contenedor
COPY . .

# Comando para ejecutar la aplicación
CMD ["npm", "start"]