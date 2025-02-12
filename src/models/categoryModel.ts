import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";

export const Category = sequelize.define(
  "Category",
  {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isbn: {
        type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.DECIMAL,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: true,
    updatedAt:true,
  }
);
