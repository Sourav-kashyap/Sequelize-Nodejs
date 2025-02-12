import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";

export const Author = sequelize.define(
  "Author",
  {
    authorName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
  }
);
