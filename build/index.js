"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db/db");
const bookModel_1 = require("./models/bookModel");
const authorModel_1 = require("./models/authorModel");
const categoryModel_1 = require("./models/categoryModel");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8088;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Home:");
});
bookModel_1.Book.sync();
authorModel_1.Author.sync();
categoryModel_1.Category.sync({ force: true });
app.listen(PORT, () => {
    console.log(`Server running on port is ${PORT}`);
    (0, db_1.dbConnect)();
});
