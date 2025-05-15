FROM node:18-alpine

# 1) crea el directorio de trabajo
WORKDIR /app

# 2) copia package.json e instala deps
COPY package*.json ./
RUN npm ci --only=production

# 3) copia el código fuente completo
COPY src/ ./src

# 4) expone el puerto
EXPOSE 3000

# 5) arranca tu app desde src/app.js
CMD ["node", "src/app.js"]
