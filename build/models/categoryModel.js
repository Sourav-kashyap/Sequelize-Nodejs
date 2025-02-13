"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db/db");
exports.Category = db_1.sequelize.define("Category", {
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isbn: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL,
    }
}, {
    freezeTableName: true,
});
