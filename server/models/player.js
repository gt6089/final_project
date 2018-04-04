'use strict'
module.exports = (sequelize, DataTypes) => {
  var Player = sequelize.define(
    'Player',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN
    },
    {}
  )
  Player.associate = function (models) {
    // associations can be defined here
    Player.belongsToMany(models.Event, {
      through: 'Attendance',
      foreignKey: 'playerId',
      otherKey: 'eventId',
      onDelete: 'cascade',
      hooks: true,
    })
    Player.belongsToMany(models.Message, {
      through: 'PlayerMessage', onDelete: 'cascade', hooks: true
    })
    Player.hasMany(models.Attendance, { foreignKey: 'playerId', onDelete: 'cascade'})
  }
  return Player
}
