const express = require('express')
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/incoming', 
messageController.parseResponse,
messageController.composeReply,
messageController.respondToMessage
)

router.post('/', messageController.createMessage)

router.get('/', messageController.getMessages);

module.exports = router;