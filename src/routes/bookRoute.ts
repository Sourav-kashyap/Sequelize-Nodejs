import express from "express";
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookById,
} from "../controllers/bookController";
const router = express.Router();

router.get("/getAllBooks", getAllBooks);
router.post("/createBook", createBook);
router.get("/getBook/:id", getBookById);
router.patch("/updateBook/:id", updateBook);
router.delete("/deleteBook/:id", deleteBook);

export default router;
