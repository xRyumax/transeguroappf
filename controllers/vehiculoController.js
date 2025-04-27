
const vehiculoService = require('../services/vehiculoService');

const obtenerVehiculos = async (req, res) => {
  try {
    const datos = await vehiculoService.listarVehiculos();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar vehiculos', error: error.message });
  }
};

const crearVehiculo = async (req, res) => {
  try {
    const nuevo = await vehiculoService.crearVehiculo(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear vehiculo', error: error.message });
  }
};

const actualizarVehiculo = async (req, res) => {
  try {
    const actualizado = await vehiculoService.actualizarVehiculo(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar vehiculo', error: error.message });
  }
};

const eliminarVehiculo = async (req, res) => {
  try {
    await vehiculoService.eliminarVehiculo(req.params.id);
    res.json({ mensaje: 'Vehiculo eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar vehiculo', error: error.message });
  }
};

module.exports = {
  obtenerVehiculos,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo
};
