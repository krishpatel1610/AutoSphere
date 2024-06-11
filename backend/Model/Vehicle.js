const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    brand_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
    name: { type: String, required: true },
    images: [{ type: String, required: true }],
    vehicle_type: { type: String, enum: ['P', 'D', 'C', 'E'], required: true },
    transmission: { type: String, enum: ['A', 'M', 'I'], required: true },
    engine_size: { type: String, required: true },
    overview: { type: String, required: true },
    varients: [{
        name: { type: String, required: true },
        engine_size: { type: String, required: true },
        transmission_type: { type: String, required: true },
        price: { type: Number, required: true }
    }],
    city_price: [{
        name: { type: String, required: true },
        price: { type: Number, required: true }
    }]
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;
