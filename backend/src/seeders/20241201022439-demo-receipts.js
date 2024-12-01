"use strict";
const { getUserIdByName, getGroupIdByName } = require("../utils/dbSeedHelper");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const johnId = await getUserIdByName("John Doe");
    const groupId = await getGroupIdByName("Weekend Getaway");

    await queryInterface.bulkInsert(
      "Receipts",
      [
        {
          name: "Cool Receipt",
          date: new Date(),
          groupId: groupId,
          createdBy: johnId,
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
    await queryInterface.bulkDelete("Receipts", null, {});
  },
};
