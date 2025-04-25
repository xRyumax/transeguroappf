const authRouter = require('./routers/authRouter');

const vehiculoRouter = require('./routers/vehiculoRouter');
const rutaRouter = require('./routers/rutaRouter');
const paradaRouter = require('./routers/paradaRouter');
const alertaRouter = require('./routers/alertaRouter');
const seguimientoRouter = require('./routers/seguimientoRouter');
const configuracionRouter = require('./routers/configuracionRouter');


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connection');

const app = express();

app.use(cors());
app.use(express.json());

const usuarioRouter = require('./routers/usuarioRouter');
app.use('/api/usuarios', usuarioRouter);

app.get('/', (req, res) => {
  res.json({ mensaje: 'API TransSeguro funcionando' });
});


app.use('/api/vehiculos', vehiculoRouter);
app.use('/api/rutas', rutaRouter);
app.use('/api/paradas', paradaRouter);
app.use('/api/alertas', alertaRouter);
app.use('/api/seguimientos', seguimientoRouter);
app.use('/api/configuracions', configuracionRouter);


app.use('/api/auth', authRouter);

<<<<<<< HEAD
const PORT = process.env.PORT || 6000; // Cambia 6000 por 3000 u otro puerto seguro
=======
const PORT = process.env.PORT || 5000;
>>>>>>> 36e6c1d122dc190a65359e5ccef36f21fa6dd909
app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  await connectDB();
});
