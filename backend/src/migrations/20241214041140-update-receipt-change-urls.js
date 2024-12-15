"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Receipts", "url", "downloadUrl");
    await queryInterface.addColumn("Receipts", "previewUrl", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Receipts", "downloadUrl", "url");
    await queryInterface.removeColumn("Receipts", "previewUrl");
  },
};
