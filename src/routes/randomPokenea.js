const express = require('express');
const router = express.Router();
const { getRandomPokenea } = require('../controllers/pokeneasController');

router.get('/', getRandomPokenea);

module.exports = router;