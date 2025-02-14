import express from "express";
import {
  getAllBook,
  createBook,
  updateBook,
  deleteBook,
  getBookById,
} from "../controllers/bookController";
const router = express.Router();

router.get("/getAllBook", getAllBook);
router.post("/createBook", createBook);
router.get("/getBook/:id", getBookById);
router.patch("/updateBook/:id", updateBook);
router.delete("/deleteBook/:id", deleteBook);

export default router;
