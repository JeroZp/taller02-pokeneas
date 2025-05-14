const express = require('express');
const morgan = require('morgan');
const path = require('path');
const pokeneaRoutes = require('./routes/pokenea.route');

const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));

// Middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'src', 'static')));

// Rutas
app.use('/', pokeneaRoutes); // Ahora manejamos la ruta raíz desde aquí

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});