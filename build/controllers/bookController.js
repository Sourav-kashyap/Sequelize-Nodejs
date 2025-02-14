"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getAllBook = void 0;
const bookModel_1 = require("../models/bookModel");
const authorModel_1 = require("../models/authorModel");
const categoryModel_1 = require("../models/categoryModel");
const getAllBook = (req, res) => { };
exports.getAllBook = getAllBook;
const getBookById = (req, res) => { };
exports.getBookById = getBookById;
const createBook = async (req, res) => {
    try {
        const { title, isbn, price, authorId, categoryId } = req.body;
        const author = await authorModel_1.Author.findOne({ where: { id: authorId } });
        if (!author) {
            res
                .status(400)
                .json({
                message: "This author are not valid first create a new Author",
            });
            return;
        }
        const category = categoryModel_1.Category.findOne({ where: { id: categoryId } });
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
        const book = bookModel_1.Book.create({ title, isbn, price, authorId, categoryId });
        res.status(201).json({ message: "Book created successfully", book });
    }
    catch (error) {
        res.status(500).json({ message: "Error while creating a Book", error });
    }
};
exports.createBook = createBook;
const updateBook = (req, res) => { };
exports.updateBook = updateBook;
const deleteBook = (req, res) => { };
exports.deleteBook = deleteBook;
