const MessagingResponse = require('twilio').twiml.MessagingResponse
const helpers = require('../helpers')
const mongoose = require('mongoose')
const Player = mongoose.model('Player')
const Event = mongoose.model('Event')

exports.getPlayerByPhone = async (req, res, next) => {
  try {
    console.log('hitting getPlayerByPhone middleware')
    const player = await Player.findOne({phone: req.body.From})
    if (!player) {
      return next()
    } else {
      console.log('found player: ', player)
      req.body.player_id = player._id
      return next()
    }
  } catch(err) {
    console.log(err)
  }
}

exports.parseResponse = async (req, res, next) => {
  const response = req.body;
  const message = response.Body.toLowerCase();
  const playerId = req.body.player_id
  console.log('From:', );
  console.log('Message:', message);
  console.log('Player_ID:', playerId);

  if (message.includes('yes')) {
    req.body.status = 'YES'
    const event = await Event.findByIdAndUpdate(
      '5a9f3ad7122b6b6755775fb3',
      { $push: { players: playerId }},
      {},
      function(err) {
        if(err) throw err;
        console.log(err);
      }
    )
    return next()
  } else if (message.includes('no')) {
    req.body.status = 'NO'
    return next()
  } else if (message.includes('maybe')) {
    req.body.status = 'MAYBE'
    return next()
  } else {
    req.body.status = false
    return next()
  }
}

exports.composeReply = (req, res, next) => {
  console.log('hitting composeReply middleware')
  const status = req.body.status
  let reply = ''

  if (status) {
    if (status === 'YES') {
      reply = `${helpers.yesMsg}. Text 'NO' before ${helpers.deadline} if you change your mind.`
    } else if (status === 'NO') {
      reply = `${helpers.noMsg}. Text 'YES' before ${helpers.deadline} if you change your mind.`
    } else if (status === 'MAYBE') {
      reply = `${helpers.maybeMsg}. But text 'YES' or 'NO' before ${helpers.deadline} or you won't be expected!`
    }
  } else {
    reply = `Your message didn't seem to be a 'YES', 'NO' or 'MAYBE' and we're a simple app. We've forwarded it to the organizer.`
  }

  req.body.reply = String(reply)
  console.log('Generated reply:', req.body.reply)
  console.log('typeof reply: ', typeof(req.body.reply))
  console.log('moving on to next middleware')
  return next()
}

exports.createMessage = (req, res) => {
  res.render('message')
}

exports.respondToMessage = (req, res) => {
  const status = req.body.status
  const reply = req.body.reply
  console.log('Response status: ', status)
  const twiml = new MessagingResponse()

  twiml.message(reply);

  res.writeHead(200, {'Content-Type': 'text/xml'})
  res.end(twiml.toString())
};
