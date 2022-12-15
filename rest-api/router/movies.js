const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { movieController } = require('../controllers');

router.get('/', movieController.getMoviesWithPagination);
router.get('/all', movieController.getMovies);
router.get('/:movieId', movieController.getMovie);
// router.get('/byGenre/:genreId', movieController.getMoviesByGenre);
router.post('/create', auth(), movieController.createMovie);
router.put('/:movieId', auth(), movieController.editMovie);
router.delete('/:movieId', auth(), movieController.deleteMovie);

module.exports = router;
