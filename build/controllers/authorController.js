"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthor = exports.updateAuthor = exports.createAuthor = exports.getAuthorById = exports.getAllAuthor = void 0;
const authorModel_1 = require("../models/authorModel");
const getAllAuthor = (req, res) => { };
exports.getAllAuthor = getAllAuthor;
const getAuthorById = (req, res) => { };
exports.getAuthorById = getAuthorById;
const createAuthor = (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ message: "All fields are required" });
        }
        const book = authorModel_1.Author.create({ name });
        res.status(201).json({ message: "Author created successfully", book });
    }
    catch (error) {
        res.status(500).json({ message: "Error while creating a Book", error });
    }
};
exports.createAuthor = createAuthor;
const updateAuthor = (req, res) => { };
exports.updateAuthor = updateAuthor;
const deleteAuthor = (req, res) => { };
exports.deleteAuthor = deleteAuthor;
