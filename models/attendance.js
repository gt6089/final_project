
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    'Attendance',
    {
      status: DataTypes.STRING,
    },
    {},
  );
  Attendance.associate = function (models) {
    // associations can be defined here
    Attendance.belongsTo(models.Player, { foreignKey: 'playerId' });
    Attendance.belongsTo(models.Event, { foreignKey: 'eventId' });
  };
  return Attendance;
};
