"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db/db");
exports.Book = db_1.sequelize.define("Book", {
    bookName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true,
});
