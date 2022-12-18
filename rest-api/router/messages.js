const express = require('express');
const router = express.Router();
const { messageController } = require('../controllers');
const { auth } = require('../utils');

router.get('/', auth(), messageController.getMessages);
router.post('/create', auth(), messageController.createMessage);
router.delete('/delete/:messageId', auth(), messageController.deleteMessage);

module.exports = router;