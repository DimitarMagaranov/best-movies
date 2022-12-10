const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { movieController } = require('../controllers');

router.get('/', movieController.getMoviesWithPagination);
router.get('/:movieId', movieController.getMovie);
router.post('/create', auth(), movieController.createMovie);
router.put('/:movieId', auth(), movieController.editMovie);
router.delete('/:movieId', auth(), movieController.deleteMovie);

module.exports = router;
