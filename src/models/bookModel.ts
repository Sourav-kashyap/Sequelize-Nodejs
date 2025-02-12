import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";

export const Book = sequelize.define(
  "Book",
  {
    bookName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
  }
);