'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      start_time: {
        type: Sequelize.STRING,
        allowNull: false
      },
      end_time: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deadline_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      deadline_time: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      min_attendees: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      max_attendees: {
        type: Sequelize.INTEGER
      },
      is_current: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      past: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      inviteMsg: {
        type: Sequelize.STRING,
        defaultValue: 'Hey guys, come to my event!'
      },
      yesMsg: {
        type: Sequelize.STRING
      },
      noMsg: {
        type: Sequelize.STRING
      },
      maybeMsg: {
        type: Sequelize.STRING
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
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events', null, {})
  }
}
