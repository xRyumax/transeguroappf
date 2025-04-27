
const Vehiculo = require('../models/vehiculoModel');

const listarVehiculos = async () => {
  return await Vehiculo.find();
};

const crearVehiculo = async (datos) => {
  const nuevo = new Vehiculo(datos);
  return await nuevo.save();
};

const actualizarVehiculo = async (id, datos) => {
  return await Vehiculo.findByIdAndUpdate(id, datos, { new: true });
};

const eliminarVehiculo = async (id) => {
  return await Vehiculo.findByIdAndDelete(id);
};

module.exports = {
  listarVehiculos,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo
};
