"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const router = express_1.default.Router();
router.get("/getAllBooks", bookController_1.getAllBooks);
router.post("/createBook", bookController_1.createBook);
router.get("/getBook/:id", bookController_1.getBookById);
router.patch("/updateBook/:id", bookController_1.updateBook);
router.delete("/deleteBook/:id", bookController_1.deleteBook);
exports.default = router;
