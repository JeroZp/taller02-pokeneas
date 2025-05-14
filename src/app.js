const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Importar rutas
const pokeneasRoutes = require('./routes/pokeneas');
const randomPokeneaRoutes = require('./routes/randomPokenea');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Obtener el ID del contenedor (puede ser el hostname o un ID personalizado)
const containerId = process.env.HOSTNAME || 'local-container';

// Middleware para añadir el ID del contenedor a todas las respuestas
app.use((req, res, next) => {
  res.setHeader('X-Container-ID', containerId);
  next();
});

// Rutas
app.use('/api/pokeneas', pokeneasRoutes);
app.use('/api/random', randomPokeneaRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`ID del contenedor: ${containerId}`);
});

module.exports = app;