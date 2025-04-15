import { Request, Response } from "express";
import { Book } from "../models/bookModel";
import { Author } from "../models/authorModel";
import { Category } from "../models/categoryModel";
import { Readable } from "stream";
import EventEmitter from "events";
import { resolve } from "path";
const eventEmitter = new EventEmitter();

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll();

    if (!books) {
      res.status(400).json({
        message: "Books not found in the DB",
      });
      return;
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error while fetching all Books", error });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      res.status(400).json({ message: "invalid Book id" });
    }

    const book = await Book.findByPk(bookId);

    if (!book) {
      res.status(400).json({
        message: "Book not found",
      });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Book", error });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, isbn, price, authorId, categoryId } = req.body;

    if (!title || !isbn || !price || !authorId || !categoryId) {
      res.status(400).json({ message: "All fields are required" });
    }

    const author = await Author.findOne({
      where: { id: authorId },
    });

    if (!author) {
      res.status(400).json({
        message: "This Author are not valid first create a new Author",
      });
      return;
    }

    const category = Category.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      res.status(400).json({
        message: "This category are not valid first create a new Category",
      });
      return;
    }

    const book = await Book.create({
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
  } catch (error) {
    res.status(500).json({ message: "Error while creating a Book", error });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { title, isbn, price, authorId, categoryId } = req.body;

    if (!title || !isbn || !price || !authorId || !categoryId) {
      res.status(400).json({ message: "All fields are required" });
    }

    const bookId = req.params.id;

    if (!bookId) {
      res.status(400).json({ message: "invalid Book id" });
    }

    const book = await Book.findByPk(bookId);

    if (!book) {
      res.status(400).json({ mesasge: "Book not found" });
      return;
    }

    const author = await Author.findOne({ where: { id: authorId } });
    if (!author) {
      res.status(400).json({
        message: "This Author are not valid first create a new Author",
      });
      return;
    }

    const category = Category.findOne({ where: { id: categoryId } });
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

    if (!updateBook) {
      res.status(400).json({
        message: "Book not updated",
      });
      return;
    }

    res.status(201).json({ message: "Book Updated successfully", updateBook });
  } catch (error) {
    res.status(500).json({ message: "Error while updating a Book", error });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      res.status(400).json({ message: "invalid Book id" });
    }

    const book = await Book.findByPk(bookId);

    if (!book) {
      res.status(400).json({
        message: "Book not found",
      });
      return;
    }
    await book.destroy();

    res.status(200).json({ message: "Book delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while deleting a Book", error });
  }
};

/* Activity - 18 */

export const bulkAddBook = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const booksArray = req.body;

    if (!Array.isArray(booksArray)) {
      return res
        .status(400)
        .json({ message: "Request body must be an array of books" });
    }

    const bookStream = Readable.from(booksArray);

    let successCount = 0;
    let failedCount = 0;
    const errors: any[] = [];

    for await (const bookData of bookStream) {
      try {
        const book = await Book.create(bookData);
        eventEmitter.emit("bookCreated", book);
        successCount++;
      } catch (err) {
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
  } catch (error) {
    console.error("Error in bulk upload from body:", error);
  }
};

export const streamAllBooks = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    res.setHeader("Content-Type", "application/x-javascript");
    res.setHeader("Transfer-Encoding", "chunked");
    res.write("[ \n");

    let offset = 0;
    const limit = 2;
    let hasMore = true;
    let isFirstChunk = true;

    while (hasMore) {
      const books = await Book.findAll({
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
          { model: Author, attributes: [] },
          { model: Category, attributes: [] },
        ],
        raw: true,
      });

      if (books.length === 0) {
        hasMore = false;
        break;
      }

      for (const book of books) {
        if (!isFirstChunk) res.write(", \n \n");
        res.write(JSON.stringify(book));
        isFirstChunk = false;
        console.log("book ->", book);
        await delay(1000);
      }

      offset += limit;
    }
    res.write("]");
    res.end();
  } catch (error) {
    console.error("Error streaming books:", error);
  }
};

eventEmitter.on("bookCreated", (book) => {
  console.log(`Book added: ${book.title}`);
});

const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
