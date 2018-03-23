const twilio = require('twilio');

const accountSid = "ACb10752fe7b06b3cbfe0fd66c5ed3fe55";
const authToken = "f208618b838e0cdc172a2665c9289faa";
const twilioNumber = "+17786542965";

exports.client = twilio(accountSid, authToken);