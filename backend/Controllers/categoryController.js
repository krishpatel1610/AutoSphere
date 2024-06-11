const Category = require('../models/Category');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    res.send(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
