const models = require('../models');
const helpers = require('../helpers');
const moment = require('moment');

const getCurrentEvent = async function () {
  try {
    const currentEvent = await models.Event.findOne({
      where: { is_current: true },
      include: [models.Player],
    });
    if (currentEvent) {
      return currentEvent;
    }
    return null;
  } catch (err) {
    console.log(err);
    return;
  }
};

exports.showEvent = async (req, res) => {
  try {
    const event = await models.Event.findOne({
      where: { id: req.params.id },
      include: [models.Player],
    });

    res.status(200).json(event);
  } catch (err) {
    res.status(400).send(err);
  }
};

function removeColonInTime(raw) {
  return raw.replace(/[^0-9]/g, '');
}

exports.getNextEvent = async (req, res) => {
  try {
    const nextEvent = await getCurrentEvent();
    res.status(200).json(nextEvent);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.createEvent = async (req, res) => {
  console.log('hitting createEvent:', req.body)
  const date = req.body.date;

  const start_time = req.body.start_time;
  const formattedStartTime = new Date(`${date} ${req.body.start_time}`);

  const end_time = req.body.end_time;
  const formattedEndTime = new Date(`${date} ${req.body.end_time}`);

  const location = req.body.location;

  const { deadline_date } = req.body;

  const formattedDeadlineTime = new Date(`${deadline_date} ${req.body.deadline_time}`);
  console.log('formatted deadline time:', formattedDeadlineTime);
  
  const deadline_time = req.body.deadline_time;

  try {
    const newEvent = {
      date,
      start_time,
      end_time,
      location: req.body.location,
      deadline_date,
      deadline_time,
      yesMsg: '',
      noMsg: '',
      maybeMsg: '',
      inviteMsg: `${req.body.inviteMsg}. ${moment(date).format('MMMM Do YYYY')} @ ${location}, ${moment(formattedStartTime).format('h:mm a')} - ${moment(formattedEndTime).format('h:mm a')}. Text 'YES', 'NO' or 'MAYBE' to this number before ${moment(deadline_date).format('MMMM Do YYYY')} @ ${moment(formattedDeadlineTime).format('h:mm a')}`,
      min_attendees: req.body.min_attendees,
      max_attendees: req.body.max_attendees,
      userId: 1,
    };

    const createdEvent = await models.Event.create(newEvent);
    res.status(201).send(createdEvent);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await models.Event.findById(req.params.id);
    const updatedEvent = await event.update(req.body);
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await models.Event.findAll({
      include: [models.Player],
      where: { past: false },
      order: [['date'], [{ model: models.Player }, 'first_name']],
    });
    res.json(events);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.showPlayersAttendance = async (req, res) => {
  try {
    const attendances = await models.Attendance.findAll({
      where: {
        eventId: req.params.id,
      },
      include: [models.Player],
    });
    res.status(200).json(attendances);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.addPlayerToEvent = async (req, res) => {
  try {
    const event = await models.Event.findById(req.params.id);
    const player = await models.Player.findById(req.body.player);

    const savedRecord = await event.addPlayer(req.body.player, {
      through: { status: req.body.status },
    });

    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updatePlayerAttendance = async (req, res) => {
  try {
    const attendanceRecord = await models.Attendance.findOne({
      where: { eventId: req.params.id, playerId: req.params.player_id },
    });

    const updatedRecord = await attendanceRecord.update({
      status: req.body.status,
    });

    res.status(200).json(updatedRecord);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.bulkUpdateEvents = async (req, res) => {
  try {
    const updatedEvents = models.Event.update(
      { is_current: false },
      { where: { is_current: true } },
    );
    res.status(200).send(updatedEvents);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await models.Event.findById(req.params.id);
    await event.destroy();
    res.status(200).json(event);
  } catch (err) {
    res.status(400).send(err);
  }
};
