const express = require('express')
const router = express.Router();
const playerController = require('../controllers/playerController')

router.get('/:id', playerController.showPlayer);

router.post('/', playerController.createPlayer);
router.get('/', playerController.getPlayers)

module.exports = router;