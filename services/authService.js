
const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (nombre, correo, password) => {
  const usuarioExistente = await Usuario.findOne({ correo });
  if (usuarioExistente) {
    throw new Error('El correo ya está registrado');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const nuevoUsuario = new Usuario({
    nombre,
    correo,
    password: hashedPassword
  });

  await nuevoUsuario.save();
  return nuevoUsuario;
};

const loginUser = async (correo, password) => {
  const usuario = await Usuario.findOne({ correo });
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  const match = await bcrypt.compare(password, usuario.password);
  if (!match) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign(
    { id: usuario._id, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  return { token, usuario };
};

module.exports = { registerUser, loginUser };
