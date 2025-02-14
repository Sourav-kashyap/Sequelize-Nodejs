"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bookModel_1 = require("../models/bookModel");
const authorModel_1 = require("../models/authorModel");
const categoryModel_1 = require("../models/categoryModel");
authorModel_1.Author.hasMany(bookModel_1.Book, {
    foreignKey: "authorId",
    onDelete: "CASCADE",
});
bookModel_1.Book.belongsTo(authorModel_1.Author, {
    foreignKey: "authorId",
});
categoryModel_1.Category.hasMany(bookModel_1.Book, {
    foreignKey: "categoryId",
    onDelete: "CASCADE",
});
bookModel_1.Book.belongsTo(categoryModel_1.Category, {
    foreignKey: "categoryId",
});
