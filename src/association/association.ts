import { Book } from "../models/bookModel";
import { Author } from "../models/authorModel";
import { Category } from "../models/categoryModel";

Author.hasMany(Book, {
  foreignKey: "authorId",
  onDelete: "CASCADE",
});

Book.belongsTo(Author, {
  foreignKey: "authorId",
});

Category.hasMany(Book, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
});

Book.belongsTo(Category, {
  foreignKey: "categoryId",
});
