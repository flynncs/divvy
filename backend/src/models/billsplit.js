"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BillSplit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BillSplit.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
      });
      BillSplit.belongsTo(models.Item, {
        foreignKey: "itemId",
        as: "item",
        onDelete: "CASCADE",
      });
      BillSplit.belongsTo(models.Receipt, {
        foreignKey: "receiptId",
        as: "receipt",
        onDelete: "CASCADE",
      });
    }
  }
  BillSplit.init(
    {
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Items",
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
      modelName: "BillSplit",
    }
  );
  return BillSplit;
};
