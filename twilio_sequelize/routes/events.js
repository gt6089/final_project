const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/:id', eventController.showEvent);

router.get('/add', eventController.addEvent);
router.post('/add', eventController.createEvent);

router.get('/', eventController.getEvents);

module.exports = router;