'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'nguyentunhat99@gmail.com',
      password: '123456',
      firstName: 'ADMIN',
      lastName: 'admin',
      address: 'Tay Tuu-Bac Tu Liem-Ha Noi',
      phonenumber: '0399025796',
      image: '1234567890',
      gender: '1',
      roleid: '1',
      positionid: '1',
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
