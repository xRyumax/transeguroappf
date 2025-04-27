
const express = require('express');
const router = express.Router();
const alertaController = require('../controllers/alertaController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, alertaController.obtenerAlertas);
router.post('/', protect, alertaController.crearAlerta);
router.put('/:id', protect, alertaController.actualizarAlerta);
router.delete('/:id', protect, alertaController.eliminarAlerta);

module.exports = router;
