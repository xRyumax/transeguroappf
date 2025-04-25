
const mongoose = require('mongoose');

const alertaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  estado: { type: String, default: 'Activo' }
});

module.exports = mongoose.model('Alerta', alertaSchema);
