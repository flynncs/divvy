"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Receipts",
      [
        {
          name: "Cool Receipt",
          date: new Date(),
          groupId: 1,
          createdBy: 1,
          totalAmount: 100.0,
          pictureUrl: "https://picsum.photos/200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
