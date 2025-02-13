"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import { Book } from "./models/bookModel";
// import { Author } from "./models/authorModel";
// import { Category } from "./models/categoryModel";
const db_1 = require("./db/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8088;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Home:");
});
// Book.sync();
// Author.sync();
// Category.sync();
(async () => {
    try {
        await db_1.sequelize.sync({ force: true });
        console.log("Database synchronized successfully.");
    }
    catch (error) {
        console.error("Error synchronizing the database:", error);
    }
})();
app.listen(PORT, async () => {
    try {
        console.log(`Server running on port is ${PORT}`);
        await (0, db_1.dbConnect)();
    }
    catch (error) {
        console.error("Error starting server:", error);
    }
});
