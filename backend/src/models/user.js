"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Group, {
        foreignKey: "createdBy",
        as: "groups",
      });
      User.belongsToMany(models.Group, {
        through: "GroupUsers",
        foreignKey: "userId",
      });
      User.hasMany(models.Item, {
        foreignKey: "createdBy",
        as: "items",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Receipt, {
        foreignKey: "createdBy",
        as: "receipts",
        onDelete: "CASCADE",
      });
      User.hasMany(models.BillSplit, {
        foreignKey: "userId",
        as: "billSplits",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      firebaseId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
