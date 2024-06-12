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
