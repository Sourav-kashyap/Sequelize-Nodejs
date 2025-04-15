import express from "express";
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookById,
  bulkAddBook,
  streamAllBooks,
} from "../controllers/bookController";
const router = express.Router();

router.get("/getAllBooks", getAllBooks);
router.post("/createBook", createBook);
router.get("/getBook/:id", getBookById);
router.patch("/updateBook/:id", updateBook);
router.delete("/deleteBook/:id", deleteBook);

/* Activity - 18 */

router.post("/blukBooks", bulkAddBook);
router.get("/getBlukBooks", streamAllBooks);

export default router;
