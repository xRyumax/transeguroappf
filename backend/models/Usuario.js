const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  correo: {
    type: String,
    required: true,
    unique: true
  },
  rol: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);