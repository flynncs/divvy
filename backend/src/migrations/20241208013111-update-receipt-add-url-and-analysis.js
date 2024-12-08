"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Receipts", "url", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Receipts", "analysis", {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Receipts", "url");
    await queryInterface.removeColumn("Receipts", "analysis");
  },
};
