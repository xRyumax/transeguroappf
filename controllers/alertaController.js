
const alertaService = require('../services/alertaService');

const obtenerAlertas = async (req, res) => {
  try {
    const datos = await alertaService.listarAlertas();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar alertas', error: error.message });
  }
};

const crearAlerta = async (req, res) => {
  try {
    const nuevo = await alertaService.crearAlerta(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear alerta', error: error.message });
  }
};

const actualizarAlerta = async (req, res) => {
  try {
    const actualizado = await alertaService.actualizarAlerta(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar alerta', error: error.message });
  }
};

const eliminarAlerta = async (req, res) => {
  try {
    await alertaService.eliminarAlerta(req.params.id);
    res.json({ mensaje: 'Alerta eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar alerta', error: error.message });
  }
};

module.exports = {
  obtenerAlertas,
  crearAlerta,
  actualizarAlerta,
  eliminarAlerta
};
