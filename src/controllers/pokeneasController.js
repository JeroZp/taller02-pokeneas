const pokeneas = require('../data/pokeneas');
const { uploadImageToS3 } = require('../services/s3Service');

// Obtener todos los Pokeneas (solo id, nombre, altura y habilidad)
const getAllPokeneas = (req, res) => {
  const containerId = res.getHeader('X-Container-ID');
  
  const simplifiedPokeneas = pokeneas.map(pokenea => ({
    id: pokenea.id,
    nombre: pokenea.nombre,
    altura: pokenea.altura,
    habilidad: pokenea.habilidad
  }));
  
  res.json({
    pokeneas: simplifiedPokeneas,
    containerId
  });
};

// Obtener un Pokenea aleatorio (imagen y frase filosófica)
const getRandomPokenea = (req, res) => {
  const containerId = res.getHeader('X-Container-ID');
  
  // Seleccionar un Pokenea aleatorio
  const randomIndex = Math.floor(Math.random() * pokeneas.length);
  const randomPokenea = pokeneas[randomIndex];
  
  res.json({
    id: randomPokenea.id,
    imagen: randomPokenea.imagen,
    fraseFilosofica: randomPokenea.fraseFilosofica,
    containerId
  });
};

// Agregar un nuevo Pokenea
const addPokenea = async (req, res) => {
  try {
    const { nombre, altura, habilidad, fraseFilosofica } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'Se requiere una imagen' });
    }
    
    // Subir imagen a S3
    const imageUrl = await uploadImageToS3(
      req.file.buffer,
      req.file.mimetype
    );
    
    // Crear nuevo Pokenea
    const newPokenea = {
      id: (pokeneas.length + 1).toString(),
      nombre,
      altura: parseFloat(altura),
      habilidad,
      imagen: imageUrl,
      fraseFilosofica
    };
    
    // Añadir a la lista
    pokeneas.push(newPokenea);
    
    res.status(201).json(newPokenea);
  } catch (error) {
    console.error('Error al agregar Pokenea:', error);
    res.status(500).json({ error: 'Error al crear el Pokenea' });
  }
};

module.exports = {
  getAllPokeneas,
  getRandomPokenea,
  addPokenea
};