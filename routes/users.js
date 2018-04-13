const userController = require('../controllers/userController');
const express = require('express');

const router = express.Router();

// Sign up
router.post('/', userController.createUser);

module.exports = router;