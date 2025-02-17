"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const router = express_1.default.Router();
router.get("/getAllCategory", categoryController_1.getAllCategory);
router.get("/getCategoryById/:id", categoryController_1.getCategoryById);
router.post("/createCategory", categoryController_1.createCategory);
router.patch("/updateCategory/:id", categoryController_1.updateCategory);
router.delete("/deleteCategory/:id", categoryController_1.deleteCategory);
exports.default = router;
