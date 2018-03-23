const MessagingResponse = require('twilio').twiml.MessagingResponse
const twilio = require('twilio')
const models = require('../models')

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

exports.parseResponse = (req, res) => {
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
      eventId: 1
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
