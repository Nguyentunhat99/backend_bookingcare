'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'nguyentunhat99@gmail.com',
      password: '123456',
      firstName: 'ADMIN',
      lastName: 'admin',
      address: 'Tay Tuu-Bac Tu Liem-Ha Noi',
      gender: '1',
      typeRole: 'ROLE', 
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
