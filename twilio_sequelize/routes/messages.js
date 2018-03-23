const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/new', messageController.createMessage)

router.post('/outgoing', messageController.sendMessage);

router.post('/incoming', messageController.parseResponse, messageController.composeReply, messageController.respondToMessage)

module.exports = router;