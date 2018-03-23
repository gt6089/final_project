
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert("Events", [
      {
        date: new Date(2018, 01, 26),
        start_time: "1940",
        end_time: "2115",
        location: "Hamilton Community Centre",
        past: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },
      {
        date: new Date(2018, 02, 05),
        start_time: "1940",
        end_time: "2115",
        location: "Hamilton Community Centre",
        past: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },
      {
        date: new Date(2018, 02, 12),
        start_time: "1940",
        end_time: "2115",
        location: "Hamilton Community Centre",
        past: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2
      },
      {
        date: new Date(2018, 02, 19),
        start_time: "1940",
        end_time: "2115",
        location: "Hamilton Community Centre",
        past: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },
      {
        date: new Date(2018, 02, 26),
        start_time: "1940",
        end_time: "2115",
        location: "Hamilton Community Centre",
        past: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },
      {
        date: new Date(2018, 03, 02),
        start_time: "1940",
        end_time: "2115",
        location: "Hamilton Community Centre",
        past: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('Events', null, {})
  }
};
