const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const { ExtractJWT } = passportJWT;
const secret = process.env.SECRET_KEY;

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },

  (email, password, cb) => {
    models.User.findOne({ email, password })
      .then((user) => {
        if (!user) {
          return cb(null, false, { message: 'Incorrect email or password.' });
        }
        return cb(null, user, { message: "You're now logged in." });
      })
      .catch((err) => {
        cb(err);
      });
  },
));

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
  },
  (jwtPayload, cb) =>
    models.User.findOneById(jwtPayload.id)
      .then(user => cb(null, user))
      .catch(err => cb(err)),
));
