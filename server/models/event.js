'use strict'
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define(
    'Event',
    {
      date: DataTypes.DATEONLY,
      start_time: DataTypes.INTEGER,
      end_time: DataTypes.INTEGER,
      location: DataTypes.STRING,
      past: DataTypes.BOOLEAN
    },
    {}
  )
  Event.associate = function (models) {
    // associations can be defined here
    Event.belongsToMany(models.Player, {
      through: 'Attendance',
      foreignKey: 'eventId',
      otherKey: 'playerId'
    })
    Event.belongsTo(models.User, { foreignKey: 'userId'})
    Event.hasMany(models.Message, { foreignKey: 'eventId'})
  }
  return Event
}
