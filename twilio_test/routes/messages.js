var express = require('express');
var router = express.Router();
const messageController = require('../controllers/messageController')

// create new message
router.get('/new',
  messageController.createMessage
)

// twilio incoming msg webhook
router.post('/incoming',
  messageController.getPlayerByPhone,
  messageController.parseResponse,
  messageController.composeReply,
  messageController.respondToMessage
)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('./messages/index');
});

module.exports = router;
