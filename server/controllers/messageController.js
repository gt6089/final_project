const MessagingResponse = require('twilio').twiml.MessagingResponse
const twilio = require('twilio')
const models = require('../models')

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

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
    const status = req.body.status
    let reply = ''

    const currentEvent = await models.Event.findById(6);

    const { yesMsg, noMsg, maybeMsg } = await models.User.findById(1);

    if (status) {
      if (status === 'YES') {
        reply = `${yesMsg}. ${currentEvent.messages('yes')}`
      }
      if (status === 'NO') {
        reply = `${noMsg}. ${currentEvent.messages('no')}`
      }
      if (status === 'MAYBE') {
        reply = `${maybeMsg}. ${currentEvent.messages('maybe')}`
      }
    } else {
      reply = `Your message didn't seem to be a 'YES', 'NO' or 'MAYBE' and we're a simple app. We've forwarded it to the organizer.`
    }

    req.body.reply = String(reply)
    console.log('Generated reply:', req.body.reply)
    console.log('moving on to next middleware')

    return next()
  } catch (err) {
    console.log(err)
    return;
  }
}

exports.respondToMessage = (req, res) => {
  console.log('hitting respondToMessage middleware')
  res.json(req.body)
}

exports.getMessages

exports.createMessage = async (req, res) => {
  const twilioMsg = {
    to: req.body.to,
    from: process.env.TWILIO_NUMBER,
    body: req.body.message
  }
  try {
    const sentMsg = await client.messages.create(twilioMsg)

    const msg = {
      to: req.body.to,
      body: req.body.message,
      sent: new Date(),
      manual: true,
      userId: 1,
      eventId: req.body.event
    }

    try {
      const savedMsg = await models.Message.create(msg)
      res.status(201).json(savedMsg)
    } catch (err) {
      console.log('problem with saving to db')
      res.status(400).send(err)
    }
  } catch (err) {
    console.log('problem with sending msg')
    res.status(400).send(err)
  }
}
