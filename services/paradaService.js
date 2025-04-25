
const Parada = require('../models/paradaModel');

const listarParadas = async () => {
  return await Parada.find();
};

const crearParada = async (datos) => {
  const nuevo = new Parada(datos);
  return await nuevo.save();
};

const actualizarParada = async (id, datos) => {
  return await Parada.findByIdAndUpdate(id, datos, { new: true });
};

const eliminarParada = async (id) => {
  return await Parada.findByIdAndDelete(id);
};

module.exports = {
  listarParadas,
  crearParada,
  actualizarParada,
  eliminarParada
};
