const express = require('express');
const router = express.Router();
const cityPriceController = require('../controllers/cityPriceController');

// Create a new city price
router.post('/', cityPriceController.createCityPrice);

module.exports = router;
