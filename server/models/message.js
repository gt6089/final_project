
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      to: DataTypes.STRING,
      dateSent: DataTypes.DATEONLY,
      timeSent: DataTypes.STRING,
      manual: DataTypes.BOOLEAN,
      body: DataTypes.TEXT,
    },
    {},
  );
  Message.associate = function (models) {
    // associations can be defined here
    Message.belongsTo(models.User, { foreignKey: 'userId' });
    Message.belongsToMany(models.Player, { through: 'PlayerMessage' });
    Message.belongsTo(models.Event, { foreignKey: 'eventId' });
  };
  return Message;
};
