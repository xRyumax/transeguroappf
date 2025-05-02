/**
 * Servicio de configuración
 * Contiene funciones para gestionar las configuraciones del sistema en la base de datos.
 */
const Configuracion = require('../models/configuracionModel');

/**
 * Obtiene todas las configuraciones almacenadas en la base de datos.
 * @returns {Promise<Array>} Arreglo de configuraciones
 */
const listarConfiguracions = async () => {
  return await Configuracion.find();
};

/**
 * Crea una nueva configuración en la base de datos.
 * @param {Object} datos - Datos de la configuración a crear
 * @returns {Promise<Object>} Configuración creada
 */
const crearConfiguracion = async (datos) => {
  const nuevo = new Configuracion(datos);
  return await nuevo.save();
};

/**
 * Actualiza una configuración existente por su ID.
 * @param {String} id - ID de la configuración a actualizar
 * @param {Object} datos - Datos nuevos para la configuración
 * @returns {Promise<Object>} Configuración actualizada
 */
const actualizarConfiguracion = async (id, datos) => {
  return await Configuracion.findByIdAndUpdate(id, datos, { new: true });
};

/**
 * Elimina una configuración por su ID.
 * @param {String} id - ID de la configuración a eliminar
 * @returns {Promise<Object>} Configuración eliminada
 */
const eliminarConfiguracion = async (id) => {
  return await Configuracion.findByIdAndDelete(id);
};

// Exporta las funciones del servicio para ser usadas en los controladores
module.exports = {
  listarConfiguracions,
  crearConfiguracion,
  actualizarConfiguracion,
  eliminarConfiguracion
};