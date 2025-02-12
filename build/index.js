"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8088;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Home:");
});
app.listen(PORT, () => {
    console.log(`Server running on port is ${PORT}`);
    (0, db_1.dbConnect)();
});
