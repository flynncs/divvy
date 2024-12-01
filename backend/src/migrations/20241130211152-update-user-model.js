"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "name", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.addColumn("Users", "firebaseId", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.addColumn("Users", "profilePicture", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "name", {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
    });

    await queryInterface.removeColumn("Users", "firebaseId");

    await queryInterface.removeColumn("Users", "profilePicture");
  },
};
