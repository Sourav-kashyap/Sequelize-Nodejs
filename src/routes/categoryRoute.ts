import express from "express";
import {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController";
const router = express.Router();

router.get("/getAllCategory", getAllCategory);
router.get("/getCategoryById/:id" , getCategoryById);
router.post("/createCategory", createCategory);
router.patch("/updateCategory/:id", updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);

export default router;
