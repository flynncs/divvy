"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John Doe",
          email: "john.doe@example.com",
          firebaseId: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          firebaseId: "q1w2e3r4t5y6u7i8o9p0a1s2d3f4g5h6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
