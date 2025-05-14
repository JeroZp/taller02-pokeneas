const { getRandomPokenea } = require('../models/pokenea.model');
const { getContainerId } = require('../utils/container.utils');

exports.getPokeneaJson = (req, res) => {
    const pokenea = getRandomPokenea();
    const containerId = getContainerId();
    
    res.json({
        id: pokenea.id,
        name: pokenea.nombre,
        height: pokenea.altura,
        ability: pokenea.habilidad,
        frase : pokenea.frase,
        imageUrl: pokenea.imagen,
        containerId
    });
};

exports.getPokeneaView = (req, res) => {
    const pokenea = getRandomPokenea();
    const containerId = getContainerId();
    console.log(pokenea.imagen );
    res.render('pokenea', { 
        id: pokenea.id,
        name: pokenea.nombre,
        height: pokenea.altura,
        ability: pokenea.habilidad,
        frase : pokenea.frase,
        imageUrl: pokenea.imagen,
        containerId
    });
};


exports.getIndex = (req, res) => {
    res.render('index');
};
