'use strict'

const jwt = require('jsonwebtoken')
const models = require('../models')
const crypto = require('crypto')

function generateToken (user) {
  return jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: 10080
  })
}

function setUserInfo (request) {
  return {
    _id: request._id,
    email: request.email
  }
}

//= =======================================
// Login Route
//= =======================================
exports.login = function (req, res, next) {
  let userInfo = setUserInfo(req.user)

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  })
}

//= =======================================
// Registration Route
//= =======================================
exports.register = async function (req, res, next) {
  console.log('hit the registration route')
  // Check for registration errors
  const email = req.body.email
  const password = req.body.password
  console.log(req.body)

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.' })
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' })
  }

  const existingUser = await models.User.findOne({ where: { email: email } })
  console.log('existingUser', existingUser)

  // If user is not unique, return error
  if (existingUser !== null) {
    console.log('hitting user is not unique')
    return res
      .status(422)
      .send({ error: 'That email address is already in use.' })
  }

  try {
    console.log('hitting try')
    // If email is unique and password was provided, create account
    let user = await models.User.create({
      email: email,
      password: password
    })

    console.log(user);

    // Subscribe member to Mailchimp list
    // mailchimp.subscribeToNewsletter(user.email);

    // Respond with JWT if user was created

    let userInfo = setUserInfo(user)

    res.status(201).json({
      token: 'JWT ' + generateToken(userInfo),
      user: userInfo
    })
  } catch (err) {
    return next(err)
  }
}

//= =======================================
// Authorization Middleware
//= =======================================
