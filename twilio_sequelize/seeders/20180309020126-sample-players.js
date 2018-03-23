("use strict");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Players",
      [
        {
          firstName: "Jane",
          lastName: "Jones",
          phone: "+1234704532",
          email: "jane@jones.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Helen",
          lastName: "Smith",
          phone: "+17495830432",
          email: "helen@smith.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Janet",
          lastName: "Anderson",
          phone: "+13096583493",
          email: "janet@anderson.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Marie",
          lastName: "Hollis",
          phone: "+16959407493",
          email: "marie@hollis.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Wendy",
          lastName: "O'Leary",
          phone: "+17507398579",
          email: "wendy@leary.com",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Players", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
