import express from "express";
import {
  getAllAuthor,
  createAuthor,
  deleteAuthor,
  updateAuthor,
  getAuthorById
} from "../controllers/authorController";
const router = express.Router();

router.get("/getAllAuthor", getAllAuthor);
router.get("/getAuthorById/:id",getAuthorById);
router.post("/createAuthor", createAuthor);
router.patch("/updateAuthor/:id", updateAuthor);
router.delete("/deleteAuthor/:id", deleteAuthor);

export default router;
