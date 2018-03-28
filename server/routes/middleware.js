const passportService = require('../config/passport')
const passport = require('passport')

module.exports = {
  requireAuth: passport.authenticate('jwt', { session: false }),
  requireLogin: passport.authenticate('local', { session: false })
}