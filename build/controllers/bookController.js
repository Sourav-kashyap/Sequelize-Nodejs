"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamAllBooks = exports.bulkAddBook = exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getAllBooks = void 0;
const bookModel_1 = require("../models/bookModel");
const authorModel_1 = require("../models/authorModel");
const categoryModel_1 = require("../models/categoryModel");
const stream_1 = require("stream");
const events_1 = __importDefault(require("events"));
const eventEmitter = new events_1.default();
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
        const author = await authorModel_1.Author.findOne({
            where: { id: authorId },
        });
        if (!author) {
            res.status(400).json({
                message: "This Author are not valid first create a new Author",
            });
            return;
        }
        const category = categoryModel_1.Category.findOne({
            where: { id: categoryId },
        });
        if (!category) {
            res.status(400).json({
                message: "This category are not valid first create a new Category",
            });
            return;
        }
        const book = await bookModel_1.Book.create({
            title,
            isbn,
            price,
            authorId,
            categoryId,
        });
        if (!book) {
            res.status(400).json({
                message: "Book not created",
            });
            return;
        }
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
        if (!exports.updateBook) {
            res.status(400).json({
                message: "Book not updated",
            });
            return;
        }
        res.status(201).json({ message: "Book Updated successfully", updateBook: exports.updateBook });
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
/* Activity - 18 */
const bulkAddBook = async (req, res) => {
    try {
        const booksArray = req.body;
        if (!Array.isArray(booksArray)) {
            return res
                .status(400)
                .json({ message: "Request body must be an array of books" });
        }
        const bookStream = stream_1.Readable.from(booksArray);
        let successCount = 0;
        let failedCount = 0;
        const errors = [];
        for await (const bookData of bookStream) {
            try {
                const book = await bookModel_1.Book.create(bookData);
                eventEmitter.emit("bookCreated", book);
                successCount++;
            }
            catch (err) {
                failedCount++;
                eventEmitter;
                errors.push({ book: bookData.title, error: err });
            }
        }
        return res.status(201).json({
            message: "Bulk book upload processed",
            successCount,
            failedCount,
            errors,
        });
    }
    catch (error) {
        console.error("Error in bulk upload from body:", error);
    }
};
exports.bulkAddBook = bulkAddBook;
const streamAllBooks = async (req, res) => {
    try {
        res.setHeader("Content-Type", "application/x-javascript");
        res.setHeader("Transfer-Encoding", "chunked");
        res.write("[");
        let offset = 0;
        const limit = 2;
        let hasMore = true;
        let isFirstChunk = true;
        while (hasMore) {
            const books = await bookModel_1.Book.findAll({
                offset,
                limit,
                attributes: [
                    "id",
                    "title",
                    "isbn",
                    "Author.name",
                    "Category.name",
                    "price",
                ],
                include: [
                    { model: authorModel_1.Author, attributes: [] },
                    { model: categoryModel_1.Category, attributes: [] },
                ],
                raw: true,
            });
            if (books.length === 0) {
                hasMore = false;
                break;
            }
            for (const book of books) {
                if (!isFirstChunk)
                    res.write(",");
                res.write(JSON.stringify(book));
                isFirstChunk = false;
                console.log("book ->", book);
                await delay(1000);
            }
            offset += limit;
        }
        res.write("]");
        res.end();
    }
    catch (error) {
        console.error("Error streaming books:", error);
    }
};
exports.streamAllBooks = streamAllBooks;
eventEmitter.on("bookCreated", (book) => {
    console.log(`Book added: ${book.title}`);
});
const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};
