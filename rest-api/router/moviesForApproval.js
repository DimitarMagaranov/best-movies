const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const {movieForApprovalController} = require('../controllers')

router.get('/all', movieForApprovalController.getMovies);
router.get('/:movieId', movieForApprovalController.getMovie);
router.post('/create', auth(), movieForApprovalController.createMovie);
router.delete('/:movieId', movieForApprovalController.deleteMovie);

module.exports = router;