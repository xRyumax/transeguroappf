
const mongoose = require('mongoose');

const paradaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  estado: { type: String, default: 'Activo' }
});

module.exports = mongoose.model('Parada', paradaSchema);
