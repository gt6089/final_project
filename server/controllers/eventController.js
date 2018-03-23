const models = require('../models')

exports.showEvent = async (req, res) => {
  console.log(req.params)
  try {
    const event = await models.Event.findById(req.params.id)
    res.status(200).json(event)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.createEvent = async (req, res) => {
  console.log('===== CREATING EVENT =====', req.body)
  try {
    const newEvent = {
      date: req.body.date,
      start_time: req.body.start_time.replace(/[^0-9]/g, ''),
      end_time: req.body.end_time.replace(/[^0-9]/g, ''),
      location: req.body.location,
      userId: 1
    }
    const createdEvent = await models.Event.create(newEvent)
    res.status(201).send(createdEvent)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.getEvents = async (req, res) => {
  try {
    const events = await models.Event.findAll()
    res.json(events)
  } catch (err) {
    res.status(400).send(err)
  }
}
