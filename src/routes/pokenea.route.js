const express = require('express');
const router = express.Router();
const { getPokeneaJson, getPokeneaView, getIndex } = require('../controllers/pokenea.controller');

router.get('/json', getPokeneaJson);
router.get('/view', getPokeneaView);
router.get('/', getIndex);

module.exports = router;