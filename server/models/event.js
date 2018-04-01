'use strict'

module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define(
    'Event',
    {
      date: DataTypes.DATEONLY,
      start_time: DataTypes.STRING,
      end_time: DataTypes.STRING,
      deadline_date: DataTypes.DATEONLY,
      deadline_time: DataTypes.STRING,
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
      otherKey: 'playerId',
      onDelete: 'cascade'
    })
    Event.belongsTo(models.User, { foreignKey: 'userId' })
    Event.hasMany(models.Message, { foreignKey: 'eventId', onDelete: 'cascade', hooks: true })
  }
  return Event
}