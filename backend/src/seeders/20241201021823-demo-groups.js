"use strict";
const { getUserIdByName } = require("../utils/dbSeedHelper");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const johnId = await getUserIdByName("John Doe");
    const janeId = await getUserIdByName("Jane Smith");

    await queryInterface.bulkInsert(
      "Groups",
      [
        {
          name: "Weekend Getaway",
          createdBy: johnId,
          pictureUrl: "https://picsum.photos/200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Office Party",
          createdBy: janeId,
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
