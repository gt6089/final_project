const MessagingResponse = require('twilio').twiml.MessagingResponse
const twilio = require('twilio')
const models = require('../models')
const helpers = require('../helpers')

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const getCurrentEvent = async function () {
  try {
    const currentEvent = await models.Event.findById(9)
    return currentEvent
  } catch (err) {
    console.log(err)
  }
}

const addPlayerToEvent = async (event, playerId, playerStatus) => {
  try {
    const savedRecord = await event.addPlayer(playerId, {
      through: { status: playerStatus }
    })
    console.log(savedRecord)
  } catch (err) {
    console.log(err)
  }
  // const player = await models.Player.findById(playerId)
}

const findPlayerByPhone = async playerPhone => {
  try {
    const player = await models.Player.findOne({
      where: { phone: playerPhone }
    })
    return player
  } catch (err) {
    console.log(err)
  }
}

const recordMessageInDb = async (message, playerId) => {
  try {
    const savedMsg = await models.Message.create(message)
    const playerMsg = await savedMsg.addPlayer(playerId)
    return savedMsg;
  } catch (err) {
    console.log(err)
  }
}

exports.parseResponse = async (req, res, next) => {
  console.log('hitting parseResponse middleware')

  const response = req.body
  const message = response.Body.toLowerCase()

  console.log('From:', req.body.From)
  console.log('Message:', message)

  if (message.includes('yes')) {
    req.body.status = 'YES'
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

exports.composeReply = async (req, res, next) => {
  try {
    console.log('hitting composeReply middleware')
    console.log(req.body)

    const status = req.body.status
    let reply = ''

    const event = await models.Event.findById(9)
    req.body.event = event.id

    const messages = helpers.messages(event)
    const player = await findPlayerByPhone(req.body.From)
    req.body.playerId = player.id

    const { yesMsg, noMsg, maybeMsg } = await models.User.findById(1)

    if (status) {
      if (status === 'YES') {
        reply = `${yesMsg}. ${messages.yes}`
        addPlayerToEvent(event, player.id, status)
      }
      if (status === 'NO') {
        reply = `${noMsg}. ${messages.no}`
        addPlayerToEvent(event, player.id, status)
      }
      if (status === 'MAYBE') {
        reply = `${maybeMsg}. ${messages.maybe}`
        addPlayerToEvent(event, player.id, status)
      }
    } else {
      reply = `We couldn't find a 'YES', 'NO' or 'MAYBE' in your message. We're a simple app so we've forwarded it to the event organizer.`
    }

    req.body.reply = String(reply)

    console.log('Generated reply:', req.body.reply)
    console.log('moving on to next middleware')

    return next()
  } catch (err) {
    console.log(err)
  }
}

exports.respondToMessage = async (req, res) => {
  console.log('hitting respondToMessage middleware')

  const status = req.body.status
  const reply = req.body.reply

  try {
    const message = {
      to: req.body.From,
      sent: new Date(),
      manual: true,
      body: reply,
      userId: 1,
      eventId: req.body.event
    }

    const savedMsg = await recordMessageInDb(message, req.body.playerId)
    console.log(savedMsg)

    const twiml = new MessagingResponse()

    twiml.message(reply)

    res.writeHead(200, { 'Content-Type': 'text/xml' })
    res.end(twiml.toString())
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
}

exports.getMessages

exports.createMessage = async (req, res) => {
  console.log(req.body)

  const phoneArr = req.body.to.split(', ')
  console.log(phoneArr)

  const event = await models.Event.findById(req.body.event)

  phoneArr.forEach(async function (phone) {
    try {
      let player = await findPlayerByPhone(phone)
      console.log('==== found player ====', player)

      let twilioMsg = {
        to: phone,
        from: process.env.TWILIO_NUMBER,
        body: event.inviteMsg
      }

      console.log('===== twilio msg ==== ', twilioMsg)

      let sentMsg = await client.messages.create(twilioMsg)
      // let sentMsg = await client.messages.create(twilioMsg)

      let msg = {
        to: phone,
        body: event.inviteMsg,
        sent: new Date(),
        manual: true,
        userId: 1,
        eventId: req.body.event
      }

      try {
        let savedMsg = await recordMessageInDb(msg, player)
        console.log('=== msg saved ====', savedMsg)
      } catch (err) {
        console.log('problem with saving to db')
        console.log(err);
        res.status(400).send(err)
      }
    } catch (err) {
      console.log(err)

      // res.status(400).send(err)
    }
  })
}
