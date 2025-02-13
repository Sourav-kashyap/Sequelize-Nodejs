"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const router = express_1.default.Router();
router.get("/getAllBook", categoryController_1.getAllCategory);
router.get("/createBook", categoryController_1.createCategory);
router.get("/updateBook/:id", categoryController_1.updateCategory);
router.get("/deleteBook/:id", categoryController_1.deleteCategory);
exports.default = router;
