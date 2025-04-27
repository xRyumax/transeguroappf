
const express = require('express');
const router = express.Router();
const rutaController = require('../controllers/rutaController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, rutaController.obtenerRutas);
router.post('/', protect, rutaController.crearRuta);
router.put('/:id', protect, rutaController.actualizarRuta);
router.delete('/:id', protect, rutaController.eliminarRuta);

module.exports = router;
