import express from "express";
import {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
const router = express.Router();

router.get("/getAllBook", getAllCategory);
router.get("/createBook", createCategory);
router.get("/updateBook/:id", updateCategory);
router.get("/deleteBook/:id", deleteCategory);

export default router;
