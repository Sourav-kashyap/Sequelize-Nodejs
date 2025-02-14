import { Request, Response } from "express";
import { Book } from "../models/bookModel";
import { Author } from "../models/authorModel";
import { Category } from "../models/categoryModel";

export const getAllBook = (req: Request, res: Response) => {};
export const getBookById = (req: Request, res: Response) => {};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, isbn, price, authorId, categoryId } = req.body;
    const author = await Author.findOne({ where: { id: authorId } });
    if (!author) {
      res
        .status(400)
        .json({
          message: "This author are not valid first create a new Author",
        });
      return;
    }
    const category = Category.findOne({ where: { id: categoryId } });
    if (!category) {
      res
        .status(400)
        .json({
          message: "This category are not valid first create a new Category",
        });
      return;
    }
    if (!title || !isbn || !price || !authorId || !categoryId) {
      res.status(400).json({ message: "All fields are required" });
    }
    const book = Book.create({ title, isbn, price, authorId, categoryId });
    res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error while creating a Book", error });
  }
};

export const updateBook = (req: Request, res: Response) => {};
export const deleteBook = (req: Request, res: Response) => {};
