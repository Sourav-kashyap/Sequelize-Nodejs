import { Request, Response } from "express";
import { Category } from "../models/categoryModel";

export const getAllCategory = (req: Request, res: Response) => {};
export const getCategoryById = (req: Request , res:Response) => {};
export const createCategory = (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "All fields are required" });
    }
    const book = Category.create({ name });
    res.status(201).json({ message: "Category created successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error while creating a Book", error });
  }
};
export const updateCategory = (req: Request, res: Response) => {};
export const deleteCategory = (req: Request, res: Response) => {};
