const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./database/connection');

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de API (primero API)
const authRouter = require('./routers/authRouter');
const vehiculoRouter = require('./routers/vehiculoRouter');
const rutaRouter = require('./routers/rutaRouter');
const paradaRouter = require('./routers/paradaRouter');
const alertaRouter = require('./routers/alertaRouter');
const seguimientoRouter = require('./routers/seguimientoRouter');
const configuracionRouter = require('./routers/configuracionRouter');
const usuarioRouter = require('./routers/usuarioRouter');

app.use('/api/auth', authRouter);
app.use('/api/vehiculos', vehiculoRouter);
app.use('/api/rutas', rutaRouter);
app.use('/api/paradas', paradaRouter);
app.use('/api/alertas', alertaRouter);
app.use('/api/seguimientos', seguimientoRouter);
app.use('/api/configuracions', configuracionRouter);
app.use('/api/usuarios', usuarioRouter);

// Luego el frontend
app.use(express.static(path.join(__dirname, 'frontend/public')));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/public/index.html'));
});

// Rutas específicas del frontend
app.get('/:page', (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, 'frontend/public', page), (err) => {
    if (err) {
      console.error('Error al servir página:', err);
      res.status(404).send('Página no encontrada');
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

// 404 para todo lo no encontrado
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    console.log('✅ Conexión a la base de datos establecida');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();
