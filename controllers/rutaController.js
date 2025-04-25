
const rutaService = require('../services/rutaService');

const obtenerRutas = async (req, res) => {
  try {
    const datos = await rutaService.listarRutas();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar rutas', error: error.message });
  }
};

const crearRuta = async (req, res) => {
  try {
    const nuevo = await rutaService.crearRuta(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear ruta', error: error.message });
  }
};

const actualizarRuta = async (req, res) => {
  try {
    const actualizado = await rutaService.actualizarRuta(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar ruta', error: error.message });
  }
};

const eliminarRuta = async (req, res) => {
  try {
    await rutaService.eliminarRuta(req.params.id);
    res.json({ mensaje: 'Ruta eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar ruta', error: error.message });
  }
};

module.exports = {
  obtenerRutas,
  crearRuta,
  actualizarRuta,
  eliminarRuta
};
