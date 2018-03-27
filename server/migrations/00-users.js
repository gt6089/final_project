'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      yesMsg: {
        type: Sequelize.STRING,
        defaultValue: "Glad you could make it. See you there!",
        allowNull: false
      },
      noMsg: {
        type: Sequelize.STRING,
        defaultValue: "Sorry you can't make it. Next time!",
        allowNull: false
      },
      maybeMsg: {
        type: Sequelize.STRING,
        defaultValue: "OK.",
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users', null, {});
  }
};