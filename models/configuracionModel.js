
const mongoose = require('mongoose');

const configuracionSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  estado: { type: String, default: 'Activo' }
});

module.exports = mongoose.model('Configuracion', configuracionSchema);
