const express = require('express')
const router = express.Router()
const playerController = require('../controllers/playerController')
const authMiddleware = require('./middleware')

router.get('/:id', authMiddleware.requireAuth, playerController.showPlayer)
router.put('/:id', authMiddleware.requireAuth, playerController.updatePlayer)
router.delete('/:id', authMiddleware.requireAuth, playerController.deletePlayer)

router.post('/', authMiddleware.requireAuth, playerController.createPlayer)
router.get('/', authMiddleware.requireAuth, playerController.getPlayers)

module.exports = router
