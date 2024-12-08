"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Receipt.hasMany(models.Item, {
        foreignKey: "receiptId",
        as: "items",
        onDelete: "CASCADE",
      });
      Receipt.belongsTo(models.Group, {
        foreignKey: "groupId",
        as: "group",
        onDelete: "CASCADE",
      });
      Receipt.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "creator",
        onDelete: "CASCADE",
      });
      Receipt.hasMany(models.BillSplit, {
        foreignKey: "receiptId",
        as: "billSplits",
        onDelete: "CASCADE",
      });
    }
  }
  Receipt.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      analysis: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Receipt",
    }
  );
  return Receipt;
};
