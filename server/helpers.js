const models = require('./models')

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
      const currentEvent = await models.Event.findById(5);
      return currentEvent;
    } catch (err) {
      console.log(err)
    }
  },

  messages: function (event) {
    return {
      yes: `Text 'NO' before ${event.deadline} if you change your mind.`,
      no: `Text 'YES' before ${event.deadline} if you change your mind.`,
      maybe: `Text 'YES' or 'NO' before ${
        event.deadline
      } or you won't be expected!`
    }
  }
}