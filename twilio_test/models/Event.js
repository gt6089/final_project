const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const eventSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: 'Must have a date'
  },
  start_time: {
    type: String,
    required: 'Must have a start time'
  },
  end_time: {
    type: String,
    required: 'Must have an end time'
  },
  players: [String],
  past: {
    type: Boolean,
    default: false
  }
})

eventSchema.statics.getPlayers = function() {
  return this.aggregate([
    {
      $unwind: '$players'
    },
    {
      $lookup:
      {
        from: "players",
        localField: "players",
        foreignField: "_id",
        as: "lookups"
      }
    },
    {
      $match: { "lookups": { $ne: [] } }
    }
  ])
}

module.exports = mongoose.model('Event', eventSchema)
