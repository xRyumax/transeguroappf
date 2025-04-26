const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
// const jwt = require('jsonwebtoken'); // Descomenta si usas JWT

exports.register = async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;
    if (!nombre || !correo || !password || !rol) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
    const userExists = await Usuario.findOne({ correo });
    if (userExists) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Usuario({ nombre, correo, password: hashedPassword, rol });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
    const user = await Usuario.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
    res.json({ message: 'Login exitoso', user: { nombre: user.nombre, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error: error.message });
  }
};
