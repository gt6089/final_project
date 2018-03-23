'use strict'
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define(
    'Message',
    {
      to: DataTypes.STRING,
      sent: DataTypes.DATE,
      manual: DataTypes.BOOLEAN,
      body: DataTypes.TEXT
    },
    {}
  )
  Message.associate = function (models) {
    // associations can be defined here
    Message.belongsTo(models.User, { as: 'Sender'})
    Message.belongsToMany(models.Player, { through: 'PlayerMessage'})
    Message.belongsTo(models.Event)
  }
  return Message
}
