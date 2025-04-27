
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'agente', 'cliente'], required: true },
  estado: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
