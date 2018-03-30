const MessagingResponse = require('twilio').twiml.MessagingResponse;
const twilio = require('twilio');
const models = require('../models');
const helpers = require('../helpers');
const moment = require('moment');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const currentEventId = 7;
const currentUserId = 1;

exports.getMessages = async (req, res) => {
  try {
    const messages = await models.Message.findAll({ include: [models.Player] });
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).send(err);
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
    console.log(savedRecord);
  } catch (err) {
    console.log(err);
  }
  // const player = await models.Player.findById(playerId)
};

const findPlayerByPhone = async (playerPhone) => {
  try {
    console.log('findPlayerByPhone - trying to find player');
    const player = await models.Player.findOne({
      where: { phone: playerPhone },
    });
    console.log('findPlayerByPhone - found player:', player);
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

exports.parseResponse = async (req, res, next) => {
  console.log('hitting parseResponse middleware');

  const response = req.body;
  const message = response.Body.toLowerCase();

  console.log('From:', req.body.From);
  console.log('Message:', message);

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
    console.log('hitting composeReply middleware');
    console.log('req.body', req.body);

    const status = req.body.status;
    let reply = '';

    const event = await models.Event.findById(currentEventId);
    console.log('event found:', event);
    req.body.event = event.id;

    const messages = helpers.messages(event);
    const player = await findPlayerByPhone(req.body.From);
    console.log('findplayer by phone result: ', player);
    req.body.playerId = player.id;

    const { yesMsg, noMsg, maybeMsg } = await models.User.findById(currentUserId);

    if (status) {
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
      reply =
        "We couldn't find a 'YES', 'NO' or 'MAYBE' in your message. We're a simple app so we've forwarded it to the event organizer.";
    }

    req.body.reply = String(reply);

    console.log('Generated reply:', req.body.reply);
    console.log('moving on to next middleware');

    return next();
  } catch (err) {
    console.log(err);
  }
};

exports.respondToMessage = async (req, res) => {
  console.log('hitting respondToMessage middleware');

  const status = req.body.status;
  const reply = req.body.reply;

  const currentDate = moment().format('YYYY-MM-DD');
  const timeSent = moment().format('H:MM');

  try {
    const message = {
      to: req.body.From,
      dateSent: currentDate,
      timeSent: timeSent,
      manual: true,
      body: reply,
      userId: 1,
      eventId: req.body.event,
    };

    const savedMsg = await recordMessageInDb(message, req.body.playerId);
    console.log(savedMsg);

    const twiml = new MessagingResponse();

    twiml.message(reply);

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.createMessage = async (req, res) => {
  console.log('createMessage - req.body', req.body);

  const phoneArr = req.body.to.split(', ');
  console.log('createMessage - phone array:', phoneArr);

  const event = await models.Event.findById(req.body.event);

  phoneArr.forEach(async (phone) => {
    try {
      const player = await findPlayerByPhone(phone);
      console.log('Create Message - phoneArr loop - ==== found player ====', player);

      if (player) {
        const twilioMsg = {
          to: phone,
          from: process.env.TWILIO_NUMBER,
          body: event.inviteMsg,
        };

        console.log('===== twilio msg ==== ', twilioMsg);

        const currentDate = moment().format('YYYY-MM-DD');
        const timeSent = moment().format('H:MM');

        const msg = {
          to: phone,
          body: event.inviteMsg,
          dateSent: currentDate,
          timeSent,
          manual: true,
          userId: 1,
          eventId: req.body.event,
        };

        const savedMsg = await recordMessageInDb(msg, player);
        console.log('=== msg saved ====', savedMsg);

        const sentMsg = await client.messages.create(twilioMsg);
        console.log('createMessage - phoneArr loop - sent message:', sentMsg);
      } else {
        res.status(400).send('could not find player. message not sent.');
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });
  res.status(200).send('END - Sent messages');
};
