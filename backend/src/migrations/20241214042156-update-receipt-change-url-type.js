"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Receipts", "downloadUrl", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn("Receipts", "previewUrl", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Receipts", "downloadUrl", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Receipts", "previewUrl", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
