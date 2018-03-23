'use strict'
module.exports = (sequelize, DataTypes) => {
  var Player = sequelize.define(
    'Player',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {}
  )
  Player.associate = function (models) {
    // associations can be defined here
    Player.belongsToMany(models.Event, {
      through: 'PlayerEvent'
    })
    Player.belongsToMany(models.Message, {
      through: 'PlayerMessage'
    })
  }
  return Player
}
