
const seguimientoService = require('../services/seguimientoService');

const obtenerSeguimientos = async (req, res) => {
  try {
    const datos = await seguimientoService.listarSeguimientos();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar seguimientos', error: error.message });
  }
};

const crearSeguimiento = async (req, res) => {
  try {
    const nuevo = await seguimientoService.crearSeguimiento(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear seguimiento', error: error.message });
  }
};

const actualizarSeguimiento = async (req, res) => {
  try {
    const actualizado = await seguimientoService.actualizarSeguimiento(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar seguimiento', error: error.message });
  }
};

const eliminarSeguimiento = async (req, res) => {
  try {
    await seguimientoService.eliminarSeguimiento(req.params.id);
    res.json({ mensaje: 'Seguimiento eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar seguimiento', error: error.message });
  }
};

module.exports = {
  obtenerSeguimientos,
  crearSeguimiento,
  actualizarSeguimiento,
  eliminarSeguimiento
};
