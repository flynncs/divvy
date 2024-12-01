"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.Group, {
        foreignKey: "groupId",
        as: "group",
        onDelete: "CASCADE",
      });
      Item.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "creator",
        onDelete: "SET NULL",
      });
      Item.belongsTo(models.Receipt, {
        foreignKey: "receiptId",
        as: "receipt",
        onDelete: "CASCADE",
      });
      Item.hasMany(models.BillSplit, {
        foreignKey: "itemId",
        as: "billSplits",
        onDelete: "CASCADE",
      });
    }
  }
  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Groups",
          key: "id",
        },
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      receiptId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Receipts",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
