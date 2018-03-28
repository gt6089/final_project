const models = require('./models')
const moment = require('moment')

module.exports = {
  getCurrentUser: async function () {
    try {
      const user = await models.User.findById(1)
      return user
    } catch (err) {
      console.log(err)
    }
  },

  getCurrentEvent: async function () {
    try {
      const currentEvent = await models.Event.findById(5)
      return currentEvent
    } catch (err) {
      console.log(err)
    }
  },

  messages: function (event) {
    const formattedDeadline = moment(event.deadline).format('MMMM Do, h:mm')
    return {
      yes: `Text 'NO' before ${formattedDeadline} if you change your mind.`,
      no: `Text 'YES' before ${formattedDeadline} if you change your mind.`,
      maybe: `Text 'YES' or 'NO' before ${formattedDeadline} or you won't be expected!`
    }
  },

  to: function (promise) {
    return promise
      .then(data => {
        return [null, data]
      })
      .catch(err => [pe(err)])
  },

  pe: require('parse-error')
}
