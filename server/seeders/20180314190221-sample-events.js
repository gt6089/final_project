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

    return queryInterface.bulkInsert('Events', [
      {
        date: new Date(2018, 01, 26),
        start_time: '19:40',
        end_time: '21:15',
        deadline_date: new Date(2018, 01, 25),
        deadline_time: '21:00',
        location: 'Hamilton Community Centre',
        min_attendees: 10,
        max_attendees: 18,
        past: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        date: new Date(2018, 02, 05),
        start_time: '19:40',
        end_time: '21:15',
        deadline_date: new Date(2018, 02, 04),
        deadline_time: '21:00',
        location: 'Hamilton Community Centre',
        min_attendees: 10,
        max_attendees: 18,
        past: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        date: new Date(2018, 02, 12),
        start_time: '19:40',
        end_time: '21:15',
        deadline_date: new Date(2018, 02, 11),
        deadline_time: '21:00',
        location: 'Hamilton Community Centre',
        min_attendees: 10,
        max_attendees: 18,
        past: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
      {
        date: new Date(2018, 02, 19),
        start_time: '19:40',
        end_time: '21:15',
        deadline_date: new Date(2018, 02, 18),
        deadline_time: '21:00',
        location: 'Hamilton Community Centre',
        min_attendees: 3,
        max_attendees: 10,
        past: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        date: new Date(2018, 02, 26),
        start_time: '19:40',
        end_time: '21:15',
        deadline_date: new Date(2018, 02, 25),
        deadline_time: '21:00',
        location: 'Hamilton Community Centre',
        min_attendees: 10,
        max_attendees: 18,
        past: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        date: new Date(2018, 03, 02),
        start_time: '19:40',
        end_time: '21:15',
        deadline_date: new Date(2018, 03, 01),
        deadline_time: '21:00',
        location: 'Hamilton Community Centre',
        min_attendees: 10,
        max_attendees: 18,
        past: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Events', null, {});
  },
};
