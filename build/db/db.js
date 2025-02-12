"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize("bms", "sourav", "sourav", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
});
const dbConnect = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log("DB Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
exports.dbConnect = dbConnect;
