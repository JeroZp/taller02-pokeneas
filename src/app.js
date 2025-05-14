const express = require('express');
const path = require('path');
const { pokeneas } = require('./data/pokeneas');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Obtener ID del contenedor
const containerId = process.env.HOSTNAME || 'local-container';

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Ruta para obtener un Pokenea aleatorio (JSON)
app.get('/api/random', (req, res) => {
  const randomPokenea = pokeneas[Math.floor(Math.random() * pokeneas.length)];
  res.json({
    ...randomPokenea,
    containerId
  });
});

// Ruta para obtener todos los Pokeneas básicos (JSON)
app.get('/api/pokeneas', (req, res) => {
  const basicPokeneas = pokeneas.map(p => ({
    id: p.id,
    nombre: p.nombre,
    altura: p.altura,
    habilidad: p.habilidad
  }));
  
  res.json({
    pokeneas: basicPokeneas,
    containerId
  });
});

// Ruta para ver un Pokenea específico
app.get('/pokenea', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'pokenea.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`ID del contenedor: ${containerId}`);
});