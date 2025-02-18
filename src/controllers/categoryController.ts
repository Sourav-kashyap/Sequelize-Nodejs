import { Request, Response } from "express";
import { Category } from "../models/categoryModel";

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categorys = await Category.findAll();

    if (!categorys) {
      res.status(400).json({
        message: "Categorys not found in the DB",
      });
      return;
    }

    res.status(200).json(categorys);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while fetching all Categorys", error });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      res.status(400).json({ message: "invalid book id" });
    }

    const category = await Category.findByPk(categoryId);

    if (!category) {
      res.status(400).json({
        message: "Category not found",
      });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Category", error });
  }
};

export const createCategory = (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "All fields are required" });
    }
    const category = Category.create({ name });

    if (!category) {
      res.status(400).json({ mesasge: "Category not created" });
      return;
    }

    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Error while creating a Book", error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Name are required" });
    }

    const categoryId = req.params.id;

    if (!categoryId) {
      res.status(400).json({ message: "invalid Category id" });
    }

    const category = await Category.findByPk(categoryId);

    if (!category) {
      res.status(400).json({ mesasge: "Category not found" });
      return;
    }

    const updatedCategory = await category.update({ name });
    res
      .status(201)
      .json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Error while updating a Category", error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      res.status(400).json({ message: "invalid Category id" });
    }

    const category = await Category.findByPk(categoryId);

    if (!category) {
      res.status(400).json({
        message: "Category not found",
      });
      return;
    }

    await category.destroy();
    res.status(200).json({ message: "Category delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while deleting a Category", error });
  }
};
