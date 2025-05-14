const { s3, bucketName } = require('../config/s3');
const { v4: uuidv4 } = require('uuid');

/**
 * Sube una imagen a S3
 * @param {Buffer} fileBuffer - Buffer de la imagen
 * @param {String} mimeType - Tipo MIME del archivo
 * @returns {Promise<String>} - URL de la imagen subida
 */
const uploadImageToS3 = async (fileBuffer, mimeType) => {
  const fileKey = `pokeneas/${uuidv4()}.${mimeType.split('/')[1]}`;
  
  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: mimeType,
    ACL: 'public-read'
  };

  const result = await s3.upload(params).promise();
  return result.Location;
};

/**
 * Obtiene la URL pública de una imagen en S3
 * @param {String} key - Clave del objeto en S3
 * @returns {String} - URL pública
 */
const getPublicUrl = (key) => {
  return `https://${bucketName}.s3.amazonaws.com/${key}`;
};

module.exports = {
  uploadImageToS3,
  getPublicUrl
};