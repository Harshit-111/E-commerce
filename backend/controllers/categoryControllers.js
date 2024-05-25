import categoryModel from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name?.trim()) {
      return res.json({ error: "name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "category already exists" });
    }
    const newCategory = new categoryModel({ name });
    await newCategory.save();
    return res.status(200).json({ newCategory });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});
const updateCategory = asyncHandler(async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(404).json({ message: "provide a name" });
    }
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    if (category.name == req.body.name.trim()) {
      return res.status(400).json({ message: "provide a new category name" });
    }
    const updatedCategory = await category.save();
    return res.status(200).json({ updatedCategory });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    await categoryModel.deleteOnd({ _id: req.params.id });
    return res.status(200).json({ message: "category successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const all = await categoryModel.find({});

    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});
const getCategory = asyncHandler(async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
};
