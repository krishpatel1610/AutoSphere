const mongoose = require('mongoose');

const CityPriceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true }
});

const CityPrice = mongoose.model('CityPrice', CityPriceSchema);
module.exports = CityPrice;
