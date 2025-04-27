
const mongoose = require('mongoose');

const seguimientoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  estado: { type: String, default: 'Activo' }
});

module.exports = mongoose.model('Seguimiento', seguimientoSchema);
