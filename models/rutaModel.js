
const mongoose = require('mongoose');

const rutaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  estado: { type: String, default: 'Activo' }
});

module.exports = mongoose.model('Ruta', rutaSchema);
