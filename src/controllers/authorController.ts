import { Request, Response } from "express";
import { Author } from "../models/authorModel";

export const getAllAuthor = (req: Request, res: Response) => {};
export const getAuthorById = (req: Request , res: Response) => {};
export const createAuthor = (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "All fields are required" });
    }
    const book = Author.create({ name });
    res.status(201).json({ message: "Author created successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error while creating a Book", error });
  }
};
export const updateAuthor = (req: Request, res: Response) => {};
export const deleteAuthor = (req: Request, res: Response) => {};
