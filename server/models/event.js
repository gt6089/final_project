'use strict'

module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define(
    'Event',
    {
      date: DataTypes.DATEONLY,
      start_time: DataTypes.INTEGER,
      end_time: DataTypes.INTEGER,
      deadline: DataTypes.DATE,
      location: DataTypes.STRING,
      min_attendees: DataTypes.INTEGER,
      max_attendees: DataTypes.INTEGER,
      past: DataTypes.BOOLEAN,
      yesMsg: DataTypes.STRING,
      noMsg: DataTypes.STRING,
      maybeMsg: DataTypes.STRING,
      inviteMsg: DataTypes.STRING
    },
    {
      hooks: {

      }
    }
  )
  Event.associate = function (models) {
    // associations can be defined here
    Event.belongsToMany(models.Player, {
      through: 'Attendance',
      foreignKey: 'eventId',
      otherKey: 'playerId'
    })
    Event.belongsTo(models.User, { foreignKey: 'userId' })
    Event.hasMany(models.Message, { foreignKey: 'eventId' })
  }
  return Event
}