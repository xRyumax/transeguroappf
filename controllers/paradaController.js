
const paradaService = require('../services/paradaService');

const obtenerParadas = async (req, res) => {
  try {
    const datos = await paradaService.listarParadas();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar paradas', error: error.message });
  }
};

const crearParada = async (req, res) => {
  try {
    const nuevo = await paradaService.crearParada(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear parada', error: error.message });
  }
};

const actualizarParada = async (req, res) => {
  try {
    const actualizado = await paradaService.actualizarParada(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar parada', error: error.message });
  }
};

const eliminarParada = async (req, res) => {
  try {
    await paradaService.eliminarParada(req.params.id);
    res.json({ mensaje: 'Parada eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar parada', error: error.message });
  }
};

module.exports = {
  obtenerParadas,
  crearParada,
  actualizarParada,
  eliminarParada
};
