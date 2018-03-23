const mongoose = require('mongoose')
const Event = mongoose.model('Event')

exports.addEvent = (req, res) => {
  res.render('./events/editEvent', {
    title: 'Edit event'
  })
}

exports.createEvent = async (req, res) => {
  console.log('hitting createEvent route')
  try {
    console.log('req.body:', req.body)
    const event = new Event(req.body)
    event.date = new Date(`${req.body.date} ${req.body.start_time}`)
    await event.save()
    res.redirect('/events')
  } catch(err) {
    console.log(err)
  }
}

exports.getEvents = async (req, res) => {
  try {
    const eventsPromise = Event.find()
    const playersPromise = Event.getPlayers()
    const [events, players] = await Promise.all([eventsPromise, playersPromise])
    console.log('events: ', events)
    console.log('players: ', players)
    res.render('./events/index', {
      title: 'Events',
      events: events || {},
      players: players
    })
  } catch(err) {
    console.log(err)
  }
}
