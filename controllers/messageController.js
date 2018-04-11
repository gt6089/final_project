const MessagingResponse = require('twilio').twiml.MessagingResponse;
const twilio = require('twilio');
const models = require('../models');
const helpers = require('../helpers');
const moment = require('moment');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const currentEventId = 9;
const currentUserId = 1;

const defaultMessages = {
  from: '## Sent by the RecRun app ##',
  dumb: '* Please do not reply to this number. Contact event organizer directly if necessary.',
  noKeyword:
    "We couldn't find a 'YES', 'NO' or 'MAYBE' in your message. We're a simple app so we've forwarded it to the event organizer.",
  full: 'Sorry, this event is full. Message the event organizer if you have any questions.',
};

// FUNCTIONS

const checkIfFull = async function (event) {
  try {
    const eventPlayers = await event.getPlayers();

    if (eventPlayers.length > 0) {
      let yesResponses = 0;
      eventPlayers.map((response) => {
        if (response.Attendance.status === 'YES') {
          yesResponses += 1;
        }
      });
      if (yesResponses === parseInt(event.max_attendees)) {
        return true;
      }
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

const getCurrentEvent = async function () {
  try {
    const currentEvent = await models.Event.findById(currentEventId);
    return currentEvent;
  } catch (err) {
    console.log(err);
  }
};

const addPlayerToEvent = async (event, playerId, playerStatus) => {
  try {
    const savedRecord = await event.addPlayer(playerId, {
      through: { status: playerStatus },
    });
    return;
  } catch (err) {
    console.log(err);
  }
};

const getAllActivePlayerPhones = async () => {
  const phoneArr = [];
  try {
    const players = await models.Player.findAll({ where: { isActive: true } });
    players.forEach((player) => {
      phoneArr.push(player.phone);
    });
    return phoneArr;
  } catch (err) {
    console.log(err);
  }
};

const findPlayerByPhone = async (playerPhone) => {
  try {
    const player = await models.Player.findOne({
      where: { phone: playerPhone },
    });
    return player;
  } catch (err) {
    console.log(err);
  }
};

const recordMessageInDb = async (message, playerId) => {
  try {
    const savedMsg = await models.Message.create(message);
    const playerMsg = await savedMsg.addPlayer(playerId);
    return savedMsg;
  } catch (err) {
    console.log(err);
  }
};

// ACTIONS

exports.getMessages = async (req, res) => {
  try {
    const messages = await models.Message.findAll({ include: [models.Player] });
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.parseResponse = async (req, res, next) => {
  const response = req.body;
  const message = response.Body.toLowerCase();

  if (message.includes('yes')) {
    req.body.status = 'YES';
    return next();
  } else if (message.includes('no')) {
    req.body.status = 'NO';
    return next();
  } else if (message.includes('maybe')) {
    req.body.status = 'MAYBE';
    return next();
  }
  req.body.status = false;
  return next();
};

exports.composeReply = async (req, res, next) => {
  try {
    const status = req.body.status;
    let reply = '';

    const event = await models.Event.findOne({ where: { is_current: true } });

    req.body.event = event.id;

    const messages = helpers.messages(event);
    const player = await findPlayerByPhone(req.body.From);

    req.body.playerId = player.id;

    const { yesMsg, noMsg, maybeMsg } = await models.User.findById(currentUserId);

    const full = await checkIfFull(event);

    if (full) {
      reply = defaultMessages.full;
    } else if (status) {
      if (status === 'YES') {
        reply = `${yesMsg}. ${messages.yes}`;
        addPlayerToEvent(event, player.id, status);
      }
      if (status === 'NO') {
        reply = `${noMsg}. ${messages.no}`;
        addPlayerToEvent(event, player.id, status);
      }
      if (status === 'MAYBE') {
        reply = `${maybeMsg}. ${messages.maybe}`;
        addPlayerToEvent(event, player.id, status);
      }
    } else {
      reply = defaultMessages.noKeyword;
    }

    req.body.reply = String(reply);

    return next();
  } catch (err) {
    console.log(err);
  }
};

exports.respondToMessage = async (req, res) => {
  const status = req.body.status;
  const reply = req.body.reply;

  const currentDate = moment().format('YYYY-MM-DD');
  const timeSent = moment().format('H:mm');

  try {
    const message = {
      to: req.body.From,
      dateSent: currentDate,
      timeSent,
      manual: true,
      body: `${reply} ${defaultMessages.from}`,
      userId: 1,
      eventId: req.body.event,
    };

    const savedMsg = await recordMessageInDb(message, req.body.playerId);

    const twiml = new MessagingResponse();

    twiml.message(reply);

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  } catch (err) {
    res.status(400).send(err);
  }
};

const populatePhoneArr = async (to, type) => {
  let phoneArr = [];

  try {
    if (type === 'invite' || type === 'reminder' || to === 'All players') {
      phoneArr = await getAllActivePlayerPhones();
      return phoneArr;
    }
    phoneArr = to.split(', ');
    return phoneArr;
  } catch (err) {
    throw new Error(err);
  }
};

exports.createMessage = async (req, res) => {
  console.log('req.body', req.body);
  const { message } = req.body;

  try {
    const phoneArr = await populatePhoneArr(message.to, message.type);

    if (message.type !== 'manual') {
      const event = await models.Event.findById(message.eventId);

      const eventAttendance = await models.Attendance.findOne({ where: { eventId: event.id } });

      const eventPlayers = await event.getPlayers();

      if (message.type === 'reminder') {
        eventPlayers.forEach((player) => {
          if (player.Attendance.status !== 'INVITED') {
            const index = phoneArr.findIndex(phone => phone === player.phone);
            phoneArr.splice(index, 1);
          }
        });
      }
    }

    const sentMsgArray = [];

    phoneArr.forEach(async (phone) => {
      try {
        const player = await findPlayerByPhone(phone);

        let manualValue = false;

        if (player) {
          const twilioMsg = {
            to: phone,
            from: process.env.TWILIO_NUMBER,
            body: message.msgBody,
          };

          if (req.body.type === 'invite') {
            twilioMsg.body = `${event.inviteMsg} ${defaultMessages.from}`;
            const status = 'INVITED';
            await addPlayerToEvent(event, player.id, status);
          } else if (message.type === 'reminder') {
            twilioMsg.body = `Don't forget to RSVP! ${event.inviteMsg} ${defaultMessages.from}`;
          } else {
            manualValue = true;
            twilioMsg.body = `${message.msgBody} ${defaultMessages.dumb} ${defaultMessages.from}`;
          }

          const currentDate = moment().format('YYYY-MM-DD');
          const timeSent = moment().format('H:mm');

          const msg = {
            to: phone,
            body: twilioMsg.body,
            dateSent: currentDate,
            timeSent,
            manual: manualValue,
            userId: 1,
            eventId: message.eventId,
          };

          const savedMsg = await recordMessageInDb(msg, player);

          sentMsgArray.push(savedMsg);
          console.log('sentMsgArray after push', sentMsgArray);

          const sentMsg = await client.messages.create(twilioMsg);

          console.log('sending message', sentMsg);
          return sentMsgArray;
        }
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
      }
    });
    console.log('sentMsgArray:', sentMsgArray);
    res.status(200).send({
      status: 'this is working',
      sentMsgs: sentMsgArray,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
