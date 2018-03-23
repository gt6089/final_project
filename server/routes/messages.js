const express = require('express')
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/incoming', messageController.parseResponse)

router.post('/', messageController.createMessage)

module.exports = router;