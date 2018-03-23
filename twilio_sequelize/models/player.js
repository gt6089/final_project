"use strict";
module.exports = (sequelize, DataTypes) => {
  var Player = sequelize.define(
    "Player",
    {
      firstName: {
        type: DataTypes.STRING,
        validate: { notEmpty: true }
      },
      lastName: DataTypes.STRING,
      phone: {
        type: DataTypes.STRING,
        validate: { notEmpty: true }
      },
      email: DataTypes.STRING
    },
    {}
  );
  Player.associate = function(models) {
    // associations can be defined here
  };
  return Player;
};
