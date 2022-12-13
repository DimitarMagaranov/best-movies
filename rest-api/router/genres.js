const express = require('express');
const router = express.Router();
const { genreController } = require('../controllers');

router.get('/', genreController.getGenres);

module.exports = router;