'use strict';
module.exports = (sequelize, DataTypes) => {
  var Attendance = sequelize.define('Attendance', {
    status: DataTypes.STRING
  }, {});
  Attendance.associate = function(models) {
    // associations can be defined here
  };
  return Attendance;
};