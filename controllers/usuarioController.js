
const usuarioService = require('../services/usuarioService');

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
  }
};

module.exports = {
  obtenerUsuarios
};
