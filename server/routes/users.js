const express = require('express')
const router = express.Router()

router.get('/players', (req, res) => {
  res.send('players route')
})

module.exports = router;