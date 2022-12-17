const express = require('express');
const router = express.Router();
// const { auth } = require('../utils');
const { adminController } = require('../controllers');

router.delete('/deleteMovie/:movieId', adminController.deleteMovie);

module.exports = router;