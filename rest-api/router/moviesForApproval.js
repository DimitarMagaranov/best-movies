const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { adminAuth } = require('../utils');
const {movieForApprovalController} = require('../controllers')

router.get('/all', auth(), adminAuth(), movieForApprovalController.getMovies);
router.get('/:movieId', auth(), adminAuth(), movieForApprovalController.getMovie);
router.post('/create', auth(), movieForApprovalController.createMovie);
router.delete('/:movieId', auth(), adminAuth(), movieForApprovalController.deleteMovie);

module.exports = router;