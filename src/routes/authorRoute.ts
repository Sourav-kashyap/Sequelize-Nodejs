import express from "express";
import {
  getAllAuthor,
  createAuthor,
  deleteAuthor,
  updateAuthor,
} from "../controllers/authorController";
const router = express.Router();

router.get("/getAllBook", getAllAuthor);
router.get("/createBook", createAuthor);
router.get("/updateBook/:id", updateAuthor);
router.get("/deleteBook/:id", deleteAuthor);

export default router;
