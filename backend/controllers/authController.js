const authRouter = require('./routers/authRouter');
const vehiculoRouter = require('./routers/vehiculoRouter');
const rutaRouter = require('./routers/rutaRouter');
const paradaRouter = require('./routers/paradaRouter');
const alertaRouter = require('./routers/alertaRouter');
const seguimientoRouter = require('./routers/seguimientoRouter');
const configuracionRouter = require('./routers/configuracionRouter');
const usuarioRouter = require('./routers/usuarioRouter');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./database/connection');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 👉 Primero registrar todas las rutas de API
app.use('/api/usuarios', usuarioRouter);
app.use('/api/vehiculos', vehiculoRouter);
app.use('/api/rutas', rutaRouter);
app.use('/api/paradas', paradaRouter);
app.use('/api/alertas', alertaRouter);
app.use('/api/seguimientos', seguimientoRouter);
app.use('/api/configuracions', configuracionRouter);
app.use('/api/auth', authRouter);

// 👉 Luego servir los archivos del frontend
app.use(express.static(path.join(__dirname, 'frontend/public')));

// 👉 Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/public/index.html'));
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
});

// Middleware de ruta no encontrada (404)
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

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

startServer();
