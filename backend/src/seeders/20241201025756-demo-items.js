"use strict";
const {
  getUserIdByName,
  getGroupIdByName,
  getReceiptIdByName,
} = require("../utils/dbSeedHelper");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const groupId = await getGroupIdByName("Weekend Getaway");
    const receiptId = await getReceiptIdByName("Cool Receipt");
    const johnId = await getUserIdByName("John Doe");
    const janeId = await getUserIdByName("Jane Smith");

    await queryInterface.bulkInsert(
      "Items",
      [
        {
          name: "Pizza",
          amount: 25.0,
          groupId: groupId,
          createdBy: johnId,
          receiptId: receiptId, // Associated with the first receipt
          date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Soda",
          amount: 10.0,
          groupId: groupId,
          createdBy: johnId,
          receiptId: receiptId, // Associated with the first receipt
          date: new Date(),
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
