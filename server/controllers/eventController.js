const models = require('../models');

exports.showEvent = async (req, res) => {
  console.log(req.params)
  try {
    const event = await models.Event.findOne({
      where: {id: req.params.id},
      include: [models.Player]
    })

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

exports.addPlayerToEvent = async (req, res) => {
  try {
    const event = await models.Event.findById(req.params.id)
    const player = await models.Player.findById(req.body.player)

    console.log('====== INCOMING REQUEST ========', req.body)
    console.log('====== EVENT ===== ', event)
    console.log('====== PLAYER =======', player)

    const savedRecord = await event.addPlayer(req.body.player, { through: { status: req.body.status}})

    console.log('====== SAVED RECORD ======', savedRecord)

    res.status(201).json(savedRecord)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.showPlayersAttendance = async (req, res) => {
  try {
    const attendances = await models.Attendance.findAll({
      attributes: ['playerId', 'status'],
      where: {
        eventId: req.params.id
      }
    })
    res.status(200).json(attendances)
  } catch (err) {
    res.status(400).send(err)
  }
}
