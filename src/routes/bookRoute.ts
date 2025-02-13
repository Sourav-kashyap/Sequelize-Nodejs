import express from "express";
import {
  getAllBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
const router = express.Router();

router.get("/getAllBook", getAllBook);
router.get("/createBook", createBook);
router.get("/updateBook/:id", updateBook);
router.get("/deleteBook/:id", deleteBook);

export default router;
