"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getAllBooks = void 0;
const bookModel_1 = require("../models/bookModel");
const authorModel_1 = require("../models/authorModel");
const categoryModel_1 = require("../models/categoryModel");
const getAllBooks = async (req, res) => {
    try {
        const books = await bookModel_1.Book.findAll();
        if (!books) {
            res.status(400).json({
                message: "Books not found in the DB",
            });
            return;
        }
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ message: "Error while fetching all Books", error });
    }
};
exports.getAllBooks = getAllBooks;
const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        if (!bookId) {
            res.status(400).json({ message: "invalid Book id" });
        }
        const book = await bookModel_1.Book.findByPk(bookId);
        if (!book) {
            res.status(400).json({
                message: "Book not found",
            });
            return;
        }
        res.status(200).json(book);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching Book", error });
    }
};
exports.getBookById = getBookById;
const createBook = async (req, res) => {
    try {
        const { title, isbn, price, authorId, categoryId } = req.body;
        if (!title || !isbn || !price || !authorId || !categoryId) {
            res.status(400).json({ message: "All fields are required" });
        }
        const author = await authorModel_1.Author.findOne({ where: { id: authorId } });
        if (!author) {
            res.status(400).json({
                message: "This Author are not valid first create a new Author",
            });
            return;
        }
        const category = categoryModel_1.Category.findOne({ where: { id: categoryId } });
        if (!category) {
            res.status(400).json({
                message: "This category are not valid first create a new Category",
            });
            return;
        }
        const book = bookModel_1.Book.create({ title, isbn, price, authorId, categoryId });
        res.status(201).json({ message: "Book created successfully", book });
    }
    catch (error) {
        res.status(500).json({ message: "Error while creating a Book", error });
    }
};
exports.createBook = createBook;
const updateBook = async (req, res) => {
    try {
        const { title, isbn, price, authorId, categoryId } = req.body;
        if (!title || !isbn || !price || !authorId || !categoryId) {
            res.status(400).json({ message: "All fields are required" });
        }
        const bookId = req.params.id;
        if (!bookId) {
            res.status(400).json({ message: "invalid Book id" });
        }
        const book = await bookModel_1.Book.findByPk(bookId);
        if (!book) {
            res.status(400).json({ mesasge: "Book not found" });
            return;
        }
        const author = await authorModel_1.Author.findOne({ where: { id: authorId } });
        if (!author) {
            res.status(400).json({
                message: "This Author are not valid first create a new Author",
            });
            return;
        }
        const category = categoryModel_1.Category.findOne({ where: { id: categoryId } });
        if (!category) {
            res.status(400).json({
                message: "This Category are not valid first create a new Category",
            });
            return;
        }
        const updatedBook = await book.update({
            title,
            isbn,
            price,
            authorId,
            categoryId,
        });
        res.status(201).json({ message: "Book created successfully", updateBook: exports.updateBook });
    }
    catch (error) {
        res.status(500).json({ message: "Error while updating a Book", error });
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        if (!bookId) {
            res.status(400).json({ message: "invalid Book id" });
        }
        const book = await bookModel_1.Book.findByPk(bookId);
        if (!book) {
            res.status(400).json({
                message: "Book not found",
            });
            return;
        }
        await book.destroy();
        res.status(200).json({ message: "Book delete successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error while deleting a Book", error });
    }
};
exports.deleteBook = deleteBook;
