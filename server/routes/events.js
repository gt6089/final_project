// events routes
const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')
const authMiddleware = require('./middleware')

router.put(
  '/:id/players/:player_id',
  eventController.updatePlayerAttendance
)

router.post(
  '/:id/players',
  eventController.addPlayerToEvent
)
router.get(
  '/:id/players',
  eventController.showPlayersAttendance
)

router.get('/:id', eventController.showEvent)
router.put('/:id', eventController.updateEvent)

router.post('/', eventController.createEvent)
router.get('/', eventController.getEvents)

module.exports = router
