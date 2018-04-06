const passport = require('passport')
const models = require('../models')
const passportJWT = require('passport-jwt')
const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt
const LocalStrategy = require('passport-local')

const localOptions = { usernameField: 'email' }

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, async function (
  email,
  password,
  done
) {
  console.log('hitting local login strategy');
  const foundUser = await models.User.findOne({ where: { email: email } })

  if (!foundUser) {
    return done(null, false, {
      error: 'Your login details could not be verified. Please try again.'
    })
  }

  console.log('foundUser', foundUser)

  try {
    const userObj = await foundUser.comparePassword(password)

    if (!userObj) {
      return done(null, false, {
        error: 'Your login details could not be verified. Please try again.'
      })
    }

    return done(null, userObj)
  } catch (err) {
    return done(err)
  }
})

const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  // Telling Passport where to find the secret
  secretOrKey: process.env.SECRET_KEY
}

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, async function (payload, done) {
  try {
    console.log('hitting JWT login strategy');
    const user = await models.User.findOne({ where: { email: payload.email } })
    console.log('user', user)
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  } catch (err) {
    return done(err, false)
  }
})

passport.use(jwtLogin)
passport.use(localLogin)
