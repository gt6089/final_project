const eventRoutes = require('./events');

module.exports = (app, db) => {
  eventRoutes(app, db);
};