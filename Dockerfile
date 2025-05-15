FROM node:18-alpine
WORKDIR /app

# Instala deps
COPY package*.json ./
RUN npm install --production

# Copia el resto (incluyendo src/, public/, views/)
COPY . .

EXPOSE 3000

# Arranca tu servidor desde src/app.js
CMD ["node", "src/app.js"]
