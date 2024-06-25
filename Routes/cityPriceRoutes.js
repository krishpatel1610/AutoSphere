const express = require('express');
const router = express.Router();
const cityPriceController = require('../Controllers/cityPriceController');

// Create a new city price
router.post('/', cityPriceController.createCityPrice);

module.exports = router;
