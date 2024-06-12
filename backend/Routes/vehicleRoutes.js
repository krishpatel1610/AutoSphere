const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Create a new vehicle
router.post('/', vehicleController.createVehicle);

// Get all vehicles
router.get('/', vehicleController.getVehicles);

// Get count of cars for each brand
router.get('/brands/:id/cars', vehicleController.getBrandCarCount);
module.exports = router;
