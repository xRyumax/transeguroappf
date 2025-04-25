
const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  estado: { type: String, default: 'Activo' }
});

module.exports = mongoose.model('Vehiculo', vehiculoSchema);
