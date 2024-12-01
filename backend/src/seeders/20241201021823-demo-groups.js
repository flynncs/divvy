"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Groups",
      [
        {
          name: "Weekend Getaway",
          createdBy: 1,
          pictureUrl: "https://picsum.photos/200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Office Party",
          createdBy: 2,
          pictureUrl: "https://picsum.photos/200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Groups", null, {});
  },
};
