const models = require('../models')

exports.showEvent = async (req, res) => {
  console.log(req.params)
  try {
    const event = await models.Event.findOne({
      where: { id: req.params.id },
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

exports.updateEvent = async (req, res) => {
  try {
    const event = await models.Event.findById(req.params.id);
    const updatedEvent = await event.update(req.body);
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(400).send(err);
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

exports.addPlayerToEvent = async (req, res) => {
  try {
    const event = await models.Event.findById(req.params.id)
    const player = await models.Player.findById(req.body.player)

    const savedRecord = await event.addPlayer(req.body.player, {
      through: { status: req.body.status }
    })

    res.status(201).json(savedRecord)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.updatePlayerAttendance = async (req, res) => {
  try {
    const attendanceRecord = await models.Attendance.findOne({
      where: {eventId: req.params.id, playerId: req.params.player_id}
    })

    const updatedRecord = await attendanceRecord.update({status: req.body.status});

    res.status(200).json(updatedRecord)
  } catch (err) {
    res.status(400).send(err)
  }
}
