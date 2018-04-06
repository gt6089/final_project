const models = require('./models');
const moment = require('moment');

module.exports = {
  async getCurrentUser() {
    try {
      const user = await models.User.findById(1);
      return user;
    } catch (err) {
      console.log(err);
    }
  },

  async getCurrentEvent() {
    try {
      const currentEvent = await models.Event.findById(5);
      return currentEvent;
    } catch (err) {
      console.log(err);
    }
  },

  messages(event) {
    const formattedDeadlineDate = moment(event.deadline_date).format('MMMM Do');

    const date = new Date(`${event.deadline_date} ${event.deadline_time}`);

    const formattedDeadlineTime = moment(date).format('h:mm a');

    return {
      yes: `Text 'NO' before ${formattedDeadlineDate} @ ${formattedDeadlineTime} if you change your mind.`,
      no: `Text 'YES' before ${formattedDeadlineDate} @ ${formattedDeadlineTime} if you change your mind.`,
      maybe: `Text 'YES' or 'NO' before ${formattedDeadlineDate} @ ${formattedDeadlineTime} or you won't be expected!`,
    };
  },

  to(promise) {
    return promise.then(data => [null, data]).catch(err => [pe(err)]);
  },

  pe: require('parse-error'),
};
