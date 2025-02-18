import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("bms", "sourav", "sourav", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
