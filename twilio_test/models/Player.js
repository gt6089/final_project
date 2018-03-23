const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const playerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
    required: 'Must have a first name'
  },
  last_name: {
    type: String,
    trim: true,
    required: false
  },
  phone: {
    type: String,
    trim: true,
    required: 'Must have a textable contact number'
  },
  email: {
    type: String,
    trim: true,
    required: false
  }
})

playerSchema.pre('save', function(next) {
  this.phone = `+1${this.phone}`
  return next()
})

module.exports = mongoose.model('Player', playerSchema)
