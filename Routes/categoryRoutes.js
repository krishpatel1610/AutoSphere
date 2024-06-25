const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/categoryController');

// Get all categories
router.get('/', categoryController.getCategories);

// Get category by ID
router.get('/:categoryId', categoryController.getCategoryById);

// Create a new category
router.post('/', categoryController.createCategory);

module.exports = router;
