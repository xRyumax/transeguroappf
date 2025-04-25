
const Usuario = require('../models/usuarioModel');

const listarUsuarios = async () => {
  return await Usuario.find({}, '-password');
};

module.exports = {
  listarUsuarios
};
