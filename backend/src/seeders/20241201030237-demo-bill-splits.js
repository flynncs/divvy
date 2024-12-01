"use strict";
const {
  getUserIdByName,
  getGroupIdByName,
  getReceiptIdByName,
  getItemIdByName,
} = require("../utils/dbSeedHelper");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const johnId = await getUserIdByName("John Doe");
    const janeId = await getUserIdByName("Jane Smith");
    const pizzaId = await getItemIdByName("Pizza");
    const sodaId = await getItemIdByName("Soda");

    await queryInterface.bulkInsert(
      "BillSplits",
      [
        {
          userId: johnId,
          itemId: pizzaId, // Pizza
          amount: 12.5,
          status: "paid",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: janeId,
          itemId: pizzaId, // Pizza
          amount: 12.5,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: johnId,
          itemId: sodaId, // Soda
          amount: 5.0,
          status: "paid",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: janeId,
          itemId: sodaId, // Soda
          amount: 5.0,
          status: "pending",
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
