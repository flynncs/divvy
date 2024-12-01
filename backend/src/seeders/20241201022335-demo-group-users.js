"use strict";
const { getUserIdByName, getGroupIdByName } = require("../utils/dbSeedHelper");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const johnId = await getUserIdByName("John Doe");
    const janeId = await getUserIdByName("Jane Smith");
    const groupId = await getGroupIdByName("Weekend Getaway");

    await queryInterface.bulkInsert(
      "GroupUsers",
      [
        {
          userId: johnId,
          groupId: groupId,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: janeId,
          groupId: groupId,
          role: "member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("GroupUsers", null, {});
  },
};
