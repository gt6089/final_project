const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

router.get("/add", playerController.addPlayer);
router.post("/add", playerController.createPlayer);

router.get("/", playerController.getPlayers);

module.exports = router;
