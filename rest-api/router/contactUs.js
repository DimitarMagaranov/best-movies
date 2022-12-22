const express = require('express');
const router = express.Router();
const { contactUsController } = require('../controllers');
const { auth } = require('../utils');
const { adminAuth } = require('../utils');

router.get('/:messageId', auth(), adminAuth(), contactUsController.getMessage);
router.get('/all', auth(), adminAuth(), contactUsController.getMessages);
router.post('/', contactUsController.createMessage);
router.put('/:messageId', auth(), adminAuth(), contactUsController.markAsReaded);

module.exports = router;