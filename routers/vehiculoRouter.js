
const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, vehiculoController.obtenerVehiculos);
router.post('/', protect, vehiculoController.crearVehiculo);
router.put('/:id', protect, vehiculoController.actualizarVehiculo);
router.delete('/:id', protect, vehiculoController.eliminarVehiculo);

module.exports = router;
