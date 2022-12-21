const express = require('express');
const router = express.Router();
const { authController, adminController } = require('../controllers');
const { auth } = require('../utils');
const { adminAuth } = require('../utils');

router.get('/', auth(), adminAuth(), adminController.getUsers);
router.get('/profile', auth(),authController.getProfileInfo);
router.put('/profile', auth(),authController.editProfileInfo);
router.delete('/:userId', auth(), adminAuth(), adminController.deleteUser);

module.exports = router