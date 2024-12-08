"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Receipts", "groupId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Groups",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Receipts", "groupId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Groups",
        key: "id",
      },
    });
  },
};
