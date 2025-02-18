"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthor = exports.updateAuthor = exports.createAuthor = exports.getAuthorById = exports.getAllAuthor = void 0;
const authorModel_1 = require("../models/authorModel");
const getAllAuthor = async (req, res) => {
    try {
        const authors = await authorModel_1.Author.findAll();
        if (!authors) {
            res.status(400).json({
                message: "Authors not found in the DB",
            });
            return;
        }
        res.status(200).json(authors);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error while fetching all Authors", error });
    }
};
exports.getAllAuthor = getAllAuthor;
const getAuthorById = async (req, res) => {
    try {
        const authorId = req.params.id;
        if (!authorId) {
            res.status(400).json({ message: "invalid Author id" });
        }
        const author = await authorModel_1.Author.findByPk(authorId);
        if (!author) {
            res.status(400).json({
                message: "Author not found",
            });
            return;
        }
        res.status(200).json(author);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching Author", error });
    }
};
exports.getAuthorById = getAuthorById;
const createAuthor = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ message: "All fields are required" });
        }
        const author = await authorModel_1.Author.create({ name });
        if (!author) {
            res.status(400).json({ message: "Author not created" });
        }
        res.status(201).json({ message: "Author created successfully", author });
    }
    catch (error) {
        res.status(500).json({ message: "Error while creating a Author", error });
    }
};
exports.createAuthor = createAuthor;
const updateAuthor = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ message: "Name is required" });
        }
        const authorId = req.params.id;
        if (!authorId) {
            res.status(400).json({ message: "invalid Author id" });
        }
        const author = await authorModel_1.Author.findByPk(authorId);
        if (!author) {
            res.status(400).json({ mesasge: "Author not found" });
            return;
        }
        const updatedAuthor = await author.update({ name });
        if (!exports.updateAuthor) {
            res.status(400).json({ mesasge: "Author not Update" });
            return;
        }
        res
            .status(201)
            .json({ message: "Author Updated successfully", updatedAuthor });
    }
    catch (error) {
        res.status(500).json({ message: "Error while updating a Author", error });
    }
};
exports.updateAuthor = updateAuthor;
const deleteAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;
        if (!authorId) {
            res.status(400).json({ message: "invalid Author id" });
        }
        const author = await authorModel_1.Author.findByPk(authorId);
        if (!author) {
            res.status(400).json({
                message: "Author not found",
            });
            return;
        }
        await author.destroy();
        res.status(200).json({ message: "Author delete successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error while deleting a Author", error });
    }
};
exports.deleteAuthor = deleteAuthor;
