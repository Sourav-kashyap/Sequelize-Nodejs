"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategory = void 0;
const categoryModel_1 = require("../models/categoryModel");
const getAllCategory = async (req, res) => {
    try {
        const categorys = await categoryModel_1.Category.findAll();
        if (!categorys) {
            res.status(400).json({
                message: "Categorys not found in the DB",
            });
            return;
        }
        res.status(200).json(categorys);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error while fetching all Categorys", error });
    }
};
exports.getAllCategory = getAllCategory;
const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            res.status(400).json({ message: "invalid book id" });
        }
        const category = await categoryModel_1.Category.findByPk(categoryId);
        if (!category) {
            res.status(400).json({
                message: "Category not found",
            });
            return;
        }
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching Category", error });
    }
};
exports.getCategoryById = getCategoryById;
const createCategory = (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ message: "All fields are required" });
        }
        const category = categoryModel_1.Category.create({ name });
        if (!category) {
            res.status(400).json({ mesasge: "Category not created" });
            return;
        }
        res
            .status(201)
            .json({ message: "Category created successfully", category });
    }
    catch (error) {
        res.status(500).json({ message: "Error while creating a Book", error });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ message: "Name are required" });
        }
        const categoryId = req.params.id;
        if (!categoryId) {
            res.status(400).json({ message: "invalid Category id" });
        }
        const category = await categoryModel_1.Category.findByPk(categoryId);
        if (!category) {
            res.status(400).json({ mesasge: "Category not found" });
            return;
        }
        const updatedCategory = await category.update({ name });
        res
            .status(201)
            .json({ message: "Category updated successfully", updatedCategory });
    }
    catch (error) {
        res.status(500).json({ message: "Error while updating a Category", error });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            res.status(400).json({ message: "invalid Category id" });
        }
        const category = await categoryModel_1.Category.findByPk(categoryId);
        if (!category) {
            res.status(400).json({
                message: "Category not found",
            });
            return;
        }
        await category.destroy();
        res.status(200).json({ message: "Category delete successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error while deleting a Category", error });
    }
};
exports.deleteCategory = deleteCategory;
