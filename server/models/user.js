'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    yesMsg: DataTypes.STRING,
    noMsg: DataTypes.STRING,
    maybeMsg: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Event, { foreignKey: 'userId'})
    User.hasMany(models.Message, { foreignKey: 'userId'})
  };
  return User;
};