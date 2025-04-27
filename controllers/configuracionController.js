
const configuracionService = require('../services/configuracionService');

const obtenerConfiguracions = async (req, res) => {
  try {
    const datos = await configuracionService.listarConfiguracions();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar configuracions', error: error.message });
  }
};

const crearConfiguracion = async (req, res) => {
  try {
    const nuevo = await configuracionService.crearConfiguracion(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear configuracion', error: error.message });
  }
};

const actualizarConfiguracion = async (req, res) => {
  try {
    const actualizado = await configuracionService.actualizarConfiguracion(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar configuracion', error: error.message });
  }
};

const eliminarConfiguracion = async (req, res) => {
  try {
    await configuracionService.eliminarConfiguracion(req.params.id);
    res.json({ mensaje: 'Configuracion eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar configuracion', error: error.message });
  }
};

module.exports = {
  obtenerConfiguracions,
  crearConfiguracion,
  actualizarConfiguracion,
  eliminarConfiguracion
};
