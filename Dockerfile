# Usa una imagen oficial de Node
FROM node:18-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los package.json primero (para cachear layer de npm install)
COPY package*.json ./

# Instala dependencias
RUN npm install --production

# Copia el resto de tu código (esto copiará src/app.js -> /app/app.js)
COPY src/ .

# Expone el puerto que usa tu servidor
EXPOSE 3000

# Comando por defecto
CMD ["node", "app.js"]
