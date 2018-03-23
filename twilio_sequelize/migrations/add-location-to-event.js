'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'Events',
      'location',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Hamilton Community Centre'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'Events',
      'location',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Hamilton Community Centre'
      }
    )
  }
}