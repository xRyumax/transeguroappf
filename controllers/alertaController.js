
/**
 * Importación del servicio de alertas que maneja la lógica de negocio
 * Este servicio contiene las funciones para interactuar con la base de datos
 */
const alertaService = require('../services/alertaService');

/**
 * Controlador para obtener todas las alertas del sistema
 * @param {Object} req - Request object de Express
 * @param {Object} res - Response object de Express
 * @returns {JSON} Lista de alertas o mensaje de error
 * @description Obtiene todas las alertas almacenadas en la base de datos
 * y las devuelve en formato JSON. En caso de error, devuelve un status 500
 */
const obtenerAlertas = async (req, res) => {
  try {
    // Obtiene la lista de alertas a través del servicio
    const datos = await alertaService.listarAlertas();
    // Envía la respuesta con las alertas encontradas
    res.json(datos);
  } catch (error) {
    // En caso de error, devuelve un status 500 (Error interno del servidor)
    res.status(500).json({ mensaje: 'Error al listar alertas', error: error.message });
  }
};

/**
 * Controlador para crear una nueva alerta en el sistema
 * @param {Object} req - Request object de Express (contiene los datos en req.body)
 * @param {Object} res - Response object de Express
 * @returns {JSON} Alerta creada o mensaje de error
 * @description Crea una nueva alerta con los datos proporcionados en el body
 * de la petición. Devuelve un status 201 si se crea correctamente
 */
const crearAlerta = async (req, res) => {
  try {
    // Crea una nueva alerta usando los datos del body
    const nuevo = await alertaService.crearAlerta(req.body);
    // Devuelve status 201 (Created) y la alerta creada
    res.status(201).json(nuevo);
  } catch (error) {
    // En caso de error, devuelve status 400 (Bad Request)
    res.status(400).json({ mensaje: 'Error al crear alerta', error: error.message });
  }
};

/**
 * Controlador para actualizar una alerta existente
 * @param {Object} req - Request object de Express (contiene id en params y datos en body)
 * @param {Object} res - Response object de Express
 * @returns {JSON} Alerta actualizada o mensaje de error
 * @description Actualiza una alerta existente identificada por su ID
 * con los nuevos datos proporcionados en el body
 */
const actualizarAlerta = async (req, res) => {
  try {
    // Actualiza la alerta usando el ID de los parámetros y los datos del body
    const actualizado = await alertaService.actualizarAlerta(req.params.id, req.body);
    // Devuelve la alerta actualizada
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
