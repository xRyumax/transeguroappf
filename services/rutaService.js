
const Ruta = require('../models/rutaModel');

const listarRutas = async () => {
  return await Ruta.find();
};

const crearRuta = async (datos) => {
  const nuevo = new Ruta(datos);
  return await nuevo.save();
};

const actualizarRuta = async (id, datos) => {
  return await Ruta.findByIdAndUpdate(id, datos, { new: true });
};

const eliminarRuta = async (id) => {
  return await Ruta.findByIdAndDelete(id);
};

module.exports = {
  listarRutas,
  crearRuta,
  actualizarRuta,
  eliminarRuta
};
