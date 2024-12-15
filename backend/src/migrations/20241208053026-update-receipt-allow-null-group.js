"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(
        'ALTER TABLE "Receipts" ALTER COLUMN "groupId" DROP NOT NULL',
        { transaction }
      );

      await queryInterface.changeColumn(
        "Receipts",
        "groupId",
        {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: "Groups",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        { transaction }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.changeColumn(
        "Receipts",
        "groupId",
        {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "Groups",
            key: "id",
          },
        },
        { transaction }
      );
    });
  },
};
