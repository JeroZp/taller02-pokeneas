const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAllPokeneas, addPokenea } = require('../controllers/pokeneasController');

// Configuración de multer para manejar imágenes
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Rutas
router.get('/', getAllPokeneas);
router.post('/', upload.single('imagen'), addPokenea);

module.exports = router;