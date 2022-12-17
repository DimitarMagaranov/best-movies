const express = require('express');
const router = express.Router();
const { messageController } = require('../controllers');

router.get('/', messageController.getMessages);
router.post('/create', messageController.createMessage);
router.delete('/delete/:messageId', messageController.deleteMessage);

module.exports = router;