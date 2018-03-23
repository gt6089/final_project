const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(logger("dev"));
app.use(bodyParser.json());

// ROUTES

const index = require("./routes/index");
const events = require("./routes/events");
const messages = require("./routes/messages");

// ERROR HANDLERS

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  let message = err.message;
  let error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.send(error, message, error.stack);
})

module.exports = app;