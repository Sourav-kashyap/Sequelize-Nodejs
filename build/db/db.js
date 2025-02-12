"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const sequelize_1 = require("sequelize");
const dbConnect = async () => {
    const sequelize = new sequelize_1.Sequelize("bms", "sourav", "sourav", {
        host: "localhost",
        port: 3306,
        dialect: "mysql",
    });
    try {
        await sequelize.authenticate();
        console.log("DB Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
exports.dbConnect = dbConnect;
