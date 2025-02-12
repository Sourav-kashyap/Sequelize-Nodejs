"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db/db");
exports.Author = db_1.sequelize.define("Author", {
    authorName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true,
});
