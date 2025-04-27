
const authService = require('../services/authService');

const register = async (req, res) => {
  const { nombre, correo, password } = req.body;
  try {
    const usuario = await authService.registerUser(nombre, correo, password);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const login = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const { token, usuario } = await authService.loginUser(correo, password);
    res.json({ token, usuario });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

module.exports = { register, login };
