const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./database/connection');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const authRouter = require('./routers/authRouter');
const usuarioRouter = require('./routers/usuarioRouter');
const vehiculoRouter = require('./routers/vehiculoRouter');
const rutaRouter = require('./routers/rutaRouter');
const paradaRouter = require('./routers/paradaRouter');
const alertaRouter = require('./routers/alertaRouter');
const seguimientoRouter = require('./routers/seguimientoRouter');
const configuracionRouter = require('./routers/configuracionRouter');

// Usar rutas de API
app.use('/api/auth', authRouter);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/vehiculos', vehiculoRouter);
app.use('/api/rutas', rutaRouter);
app.use('/api/paradas', paradaRouter);
app.use('/api/alertas', alertaRouter);
app.use('/api/seguimientos', seguimientoRouter);
app.use('/api/configuracions', configuracionRouter);

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'frontend/public')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/public/index.html'));
});

// Rutas dinámicas para otras páginas del frontend
app.get('/:page', (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, 'frontend/public', page), (err) => {
    if (err) {
      console.error('Error al servir la página:', err);
      res.status(404).send('Página no encontrada');
    }
  });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Puerto
const PORT = process.env.PORT || 3000;

// Función para iniciar el servidor
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

// Iniciar el servidor
startServer();
