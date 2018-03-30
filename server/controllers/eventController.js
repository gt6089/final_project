const models = require('../models')
const helpers = require('../helpers')
const moment = require('moment')

const getCurrentEvent = async function () {
  try {
    const currentEvent = await models.Event.findById(5)
    return currentEvent
  } catch (err) {
    console.log(err)
  }
}

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
  // const messages = helpers.messages();
  const date = req.body.date
  const start_time = req.body.start_time.replace(/[^0-9]/g, '')
  const formattedStartTime = new Date(`${date} ${req.body.start_time}`)
  const end_time = req.body.end_time.replace(/[^0-9]/g, '')
  const formattedEndTime = new Date(`${date} ${req.body.end_time}`)
  const location = req.body.location
  const deadline = new Date(`${req.body.deadline}`)
  const inviteMsg = req.body.invite
  console.log(inviteMsg);

  try {
    const newEvent = {
      date: date,
      start_time: start_time,
      end_time: end_time,
      location: req.body.location,
      deadline: deadline,
      yesMsg: '',
      noMsg: '',
      maybeMsg: '',
      inviteMsg: `${req.body.invite}. ${moment(date).format(
        'MMMM Do YYYY'
      )} @ ${location}, ${moment(formattedStartTime).format(
        'h:mm a'
      )} - ${moment(formattedEndTime).format(
        'h:mm a'
      )}. Text 'YES', 'NO' or 'MAYBE' to this number before ${moment(
        deadline
      ).format('MMMM Do YYYY, h:mm a')}`,
      userId: 1
    }
    const createdEvent = await models.Event.create(newEvent)
    res.status(201).send(createdEvent)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
}

exports.updateEvent = async (req, res) => {
  try {
    const event = await models.Event.findById(req.params.id)
    const updatedEvent = await event.update(req.body)
    res.status(200).json(updatedEvent)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.getEvents = async (req, res) => {
  try {
    const events = await models.Event.findAll({
      include: [models.Player],
      order: ['date']
    })
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
      where: { eventId: req.params.id, playerId: req.params.player_id }
    })

    const updatedRecord = await attendanceRecord.update({
      status: req.body.status
    })

    res.status(200).json(updatedRecord)
  } catch (err) {
    res.status(400).send(err)
  }
}
