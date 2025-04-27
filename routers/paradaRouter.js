
const express = require('express');
const router = express.Router();
const paradaController = require('../controllers/paradaController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, paradaController.obtenerParadas);
router.post('/', protect, paradaController.crearParada);
router.put('/:id', protect, paradaController.actualizarParada);
router.delete('/:id', protect, paradaController.eliminarParada);

module.exports = router;
