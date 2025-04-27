
const express = require('express');
const vehiculoController = require('../controllers/vehiculoController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas de vehículos
router.get('/', protect, vehiculoController.obtenerVehiculos);
router.post('/', protect, vehiculoController.crearVehiculo);
router.put('/:id', protect, vehiculoController.actualizarVehiculo);
router.delete('/:id', protect, vehiculoController.eliminarVehiculo);

module.exports = router;
