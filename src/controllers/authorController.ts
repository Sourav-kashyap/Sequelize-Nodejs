import { Request, Response } from "express";
import { Author } from "../models/authorModel";

export const getAllAuthor = async (req: Request, res: Response) => {
  try {
    const authors = await Author.findAll();
    if (!authors) {
      res.status(400).json({
        message: "Authors not found in the DB",
      });
      return;
    }

    res.status(200).json(authors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while fetching all Authors", error });
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const authorId = req.params.id;

    if (!authorId) {
      res.status(400).json({ message: "invalid Author id" });
    }

    const author = await Author.findByPk(authorId);

    if (!author) {
      res.status(400).json({
        message: "Author not found",
      });
      return;
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Author", error });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "All fields are required" });
    }

    const author = await Author.create({ name });

    if (!author) {
      res.status(400).json({ message: "Author not created" });
    }

    res.status(201).json({ message: "Author created successfully", author });
  } catch (error) {
    res.status(500).json({ message: "Error while creating a Author", error });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Name is required" });
    }

    const authorId = req.params.id;

    if (!authorId) {
      res.status(400).json({ message: "invalid Author id" });
    }

    const author = await Author.findByPk(authorId);

    if (!author) {
      res.status(400).json({ mesasge: "Author not found" });
      return;
    }

    const updatedAuthor = await author.update({ name });

    if (!updateAuthor) {
      res.status(400).json({ mesasge: "Author not Update" });
      return;
    }

    res
      .status(201)
      .json({ message: "Author Updated successfully", updatedAuthor });
  } catch (error) {
    res.status(500).json({ message: "Error while updating a Author", error });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const authorId = req.params.id;

    if (!authorId) {
      res.status(400).json({ message: "invalid Author id" });
    }

    const author = await Author.findByPk(authorId);

    if (!author) {
      res.status(400).json({
        message: "Author not found",
      });
      return;
    }
    await author.destroy();
    res.status(200).json({ message: "Author delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while deleting a Author", error });
  }
};
