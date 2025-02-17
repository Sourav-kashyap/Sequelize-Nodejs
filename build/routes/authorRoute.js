"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorController_1 = require("../controllers/authorController");
const router = express_1.default.Router();
router.get("/getAllAuthor", authorController_1.getAllAuthor);
router.get("/getAuthorById/:id", authorController_1.getAuthorById);
router.post("/createAuthor", authorController_1.createAuthor);
router.patch("/updateAuthor/:id", authorController_1.updateAuthor);
router.delete("/deleteAuthor/:id", authorController_1.deleteAuthor);
exports.default = router;
