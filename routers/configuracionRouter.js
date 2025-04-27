
const express = require('express');
const router = express.Router();
const configuracionController = require('../controllers/configuracionController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, configuracionController.obtenerConfiguracions);
router.post('/', protect, configuracionController.crearConfiguracion);
router.put('/:id', protect, configuracionController.actualizarConfiguracion);
router.delete('/:id', protect, configuracionController.eliminarConfiguracion);

module.exports = router;
