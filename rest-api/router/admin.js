const express = require('express');
const router = express.Router();
// const { auth } = require('../utils');
const { adminController } = require('../controllers');

router.put('/approveMovie/:movieId', adminController.approveMovie);

module.exports = router;