var express = require('express');
var router = express.Router();
const eventController = require('../controllers/eventController')

router.get('/add',
  eventController.addEvent
)

router.post('/add',
  eventController.createEvent
)

router.get('/',
  eventController.getEvents
)

module.exports = router;
