const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);
    
    const { nombre, email, password } = req.body;
    
    // Validar campos
    if (!nombre?.trim() || !email?.trim() || !password?.trim()) {
      console.error('Validación fallida:', { nombre, email, password });
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    console.log('Buscando usuario existente...');
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      console.error('Usuario ya existe:', email);
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    console.log('Creando hash de contraseña...');
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Creando nuevo usuario...');
    // Crear nuevo usuario
    const nuevoUsuario = new User({
      nombre,
      email,
      password: hashedPassword
    });

    await nuevoUsuario.save();
    console.log('Usuario registrado exitosamente:', nuevoUsuario);
    res.status(201).json({ message: 'Usuario registrado exitosamente' });

  } catch (error) {
    console.error('Error detallado:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

module.exports = router;
