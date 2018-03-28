const authController = require('../controllers/authController')
const express = require('express')
const router = express.Router();
const authMiddleware = require('./middleware');

// Sign up
router.post('/signup', authController.register)

// Log in
router.post('/login', authMiddleware.requireLogin, authController.login)

module.exports = router;