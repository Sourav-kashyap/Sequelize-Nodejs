"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategory = void 0;
const categoryModel_1 = require("../models/categoryModel");
const getAllCategory = (req, res) => { };
exports.getAllCategory = getAllCategory;
const getCategoryById = (req, res) => { };
exports.getCategoryById = getCategoryById;
const createCategory = (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ message: "All fields are required" });
        }
        const book = categoryModel_1.Category.create({ name });
        res.status(201).json({ message: "Category created successfully", book });
    }
    catch (error) {
        res.status(500).json({ message: "Error while creating a Book", error });
    }
};
exports.createCategory = createCategory;
const updateCategory = (req, res) => { };
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => { };
exports.deleteCategory = deleteCategory;
