// events routes
const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')
const authMiddleware = require('./middleware')

router.put(
  '/:id/players/:player_id',
  authMiddleware.requireAuth,
  eventController.updatePlayerAttendance
)

router.post(
  '/:id/players',
  authMiddleware.requireAuth,
  eventController.addPlayerToEvent
)
router.get(
  '/:id/players',
  authMiddleware.requireAuth,
  eventController.showPlayersAttendance
)

router.get('/:id', authMiddleware.requireAuth, eventController.showEvent)
router.put('/:id', authMiddleware.requireAuth, eventController.updateEvent)

router.post('/', authMiddleware.requireAuth, eventController.createEvent)
router.get('/', authMiddleware.requireAuth, eventController.getEvents)

module.exports = router
