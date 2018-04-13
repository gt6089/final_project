const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs')

const app = express()

require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))

// ROUTES

const index = require('./routes/index')
const events = require('./routes/events')
const messages = require('./routes/messages')
const players = require('./routes/players')
const users = require('./routes/users');

app.use('/api', users)
app.use('/api/players', players)
app.use('/api/events', events)
app.use('/api/messages', messages)

// ERROR HANDLERS

app.use((req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  let message = err.message
  let error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.send(error, message, error.stack)
})

module.exports = app
