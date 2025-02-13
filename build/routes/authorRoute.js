"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorController_1 = require("../controllers/authorController");
const router = express_1.default.Router();
router.get("/getAllBook", authorController_1.getAllAuthor);
router.get("/createBook", authorController_1.createAuthor);
router.get("/updateBook/:id", authorController_1.updateAuthor);
router.get("/deleteBook/:id", authorController_1.deleteAuthor);
exports.default = router;
