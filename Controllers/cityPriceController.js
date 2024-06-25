const CityPrice = require('../Model/CityPrice');

exports.createCityPrice = async (req, res) => {
  try {
    const cityPrice = new CityPrice(req.body);
    await cityPrice.save();
    res.status(201).send(cityPrice);
  } catch (error) {
    res.status(400).send(error);
  }
};
