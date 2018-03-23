'use strict';

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
   return queryInterface.bulkInsert("Players", [
     {
       first_name: "Kayla",
       last_name: "Doggett",
       phone: "123-456-7890",
       email: "kaylad@gmail.com",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       first_name: "Jane",
       last_name: "Smith",
       phone: "343-434-8291",
       email: "janesmith@hotmail.com",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       first_name: "Hannah",
       last_name: "Mckenzie",
       phone: "121-093-7129",
       email: "hannahmac@gmail.com",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       first_name: "Maggie",
       last_name: "Johnson",
       phone: "891-565-7720",
       email: "maggiejohns@hotmail.com",
       createdAt: new Date(),
       updatedAt: new Date()
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
   return queryInterface.bulkDelete("Players", null, {});
  }
};
