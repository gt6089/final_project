'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    date: {
      type: DataTypes.DATEONLY,
      notNull: true
    },
    start_time: {
      type: DataTypes.INTEGER
    },
    end_time: {
      type: DataTypes.INTEGER
    },
    location: {
      type: DataTypes.STRING,
      notNull: true
    },
    past: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};