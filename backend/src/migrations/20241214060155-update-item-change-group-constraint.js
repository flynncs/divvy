"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER TABLE "Items" ALTER COLUMN "groupId" DROP NOT NULL'
    );

    await queryInterface.changeColumn("Items", "groupId", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "Groups",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Items", "groupId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Groups",
        key: "id",
      },
    });
  },
};
