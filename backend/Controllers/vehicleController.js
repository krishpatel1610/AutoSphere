const Vehicle = require('../Model/Vehicle');

exports.createVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).send(vehicle);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getVehicles = async (req, res) => {
  try {
      const vehicles = await Vehicle.find();
      res.status(200).send(vehicles);
  } catch (error) {
      res.status(500).send(error.message);
  }
};


exports.getBrandCarCount = async (req, res) => {
  try {
      const brandId = req.params.id;

      const vehicles = await Vehicle.find({ brand_id: brandId });
  
      const vehicleCount = vehicles.length;

      res.json({ brandId, vehicleCount });
  } catch (error) {
      console.error('Error fetching vehicle data:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getVehiclesByCategory = async (categoryId) => {
  try {
    const vehicles = await Vehicle.find({ category_id: categoryId });
    return vehicles;
  } catch (error) {
    console.error('Error fetching vehicles by category:', error);
    throw new Error('Failed to fetch vehicles by category');
  }
};