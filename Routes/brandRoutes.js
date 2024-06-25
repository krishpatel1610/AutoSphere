const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

// Create a new brand
router.post('/', brandController.createBrand);

// Get all brands
router.get('/', brandController.getBrands);

// Get brand by ID
router.get('/:brandId', brandController.getBrandById);

router.delete('/:brandId', brandController.deleteBrand);

module.exports = router;
