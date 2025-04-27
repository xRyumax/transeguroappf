
const express = require('express');
const router = express.Router();
const seguimientoController = require('../controllers/seguimientoController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, seguimientoController.obtenerSeguimientos);
router.post('/', protect, seguimientoController.crearSeguimiento);
router.put('/:id', protect, seguimientoController.actualizarSeguimiento);
router.delete('/:id', protect, seguimientoController.eliminarSeguimiento);

module.exports = router;
