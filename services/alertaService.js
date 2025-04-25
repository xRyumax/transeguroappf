
const Alerta = require('../models/alertaModel');

const listarAlertas = async () => {
  return await Alerta.find();
};

const crearAlerta = async (datos) => {
  const nuevo = new Alerta(datos);
  return await nuevo.save();
};

const actualizarAlerta = async (id, datos) => {
  return await Alerta.findByIdAndUpdate(id, datos, { new: true });
};

const eliminarAlerta = async (id) => {
  return await Alerta.findByIdAndDelete(id);
};

module.exports = {
  listarAlertas,
  crearAlerta,
  actualizarAlerta,
  eliminarAlerta
};
