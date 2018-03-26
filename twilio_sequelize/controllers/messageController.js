const MessagingResponse = require('twilio').twiml.MessagingResponse;
const twilio = require('twilio');

const accountSid = "ACb10752fe7b06b3cbfe0fd66c5ed3fe55";
const authToken = "f208618b838e0cdc172a2665c9289faa";
const twilioNumber = "+17786542965";

const client = twilio(accountSid, authToken);


const h = require('../helpers')
const models = require('../models');

// exports.getPlayerByPhone = async (req, res, next) => {
//   try {
//     console.log('hitting getPlayerByPhone middleware')
//     const player = await Player.findOne({phone: req.body.From})
//     if (!player) {
//       return next()
//     } else {
//       console.log('found player: ', player)
//       req.body.player_id = player._id
//       return next()
//     }
//   } catch(err) {
//     console.log(err)
//   }
// }

exports.parseResponse = async (req, res, next) => {
  const response = req.body;
  const message = response.Body.toLowerCase();

  console.log('From:', req.body.From);
  console.log('Message:', message);

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

exports.composeReply = (req, res, next) => {
  console.log('hitting composeReply middleware')
  console.log('from', req.body.From, 'status', req.body.status);
  const status = req.body.status;
  let reply = ''

  if (status) {
    if (status === 'YES') {
      reply = `${h.yesMsg}. Text 'NO' before ${h.deadline} if you change your mind.`
    } else if (status === 'NO') {
      reply = `${h.noMsg}. Text 'YES' before ${h.deadline} if you change your mind.`
    } else if (status === 'MAYBE') {
      reply = `${h.maybeMsg}. But text 'YES' or 'NO' before ${h.deadline} or you won't be expected!`
    }
  } else {
    reply = `Your message didn't seem to be a 'YES', 'NO' or 'MAYBE' and we're a simple app. We've forwarded it to the organizer.`
  }

  req.body.reply = String(reply)
  console.log('Generated reply:', req.body.reply)
  console.log('moving on to next middleware')
  return next()
}

exports.createMessage = (req, res) => {
  res.render('./messages/new')
}

exports.sendMessage = async (req, res) => {
  console.log('Request body:', req.body);
  const message = {
    to: "+16045180877",
    from: "+17786542965",
    body: "hello"
  }
  try {
    await client.messages.create({
      to: '+16045180877',
      from: twilioNumber,
      body: "test"
    })
    console.log('message sent')
    res.redirect('/events')
  } catch(err) {
    console.error(err);
  }
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
