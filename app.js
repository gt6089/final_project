const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
require('./config/passport');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

// ROUTES

const index = require('./routes/index');
const events = require('./routes/events');
const messages = require('./routes/messages');
const players = require('./routes/players');
const users = require('./routes/users');
const auth = require('./routes/auth');

app.use('/api/users', users);
app.use('/api/players', passport.authenticate('jwt', { session: false }), players);
app.use('/api/events', passport.authenticate('jwt', { session: false }), events);
app.use('/api/messages', passport.authenticate('jwt', { session: false }), messages);
app.use('/api/auth', auth);

// ERROR HANDLERS

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const message = err.message;
  const error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(error, message, error.stack);
});

module.exports = app;
