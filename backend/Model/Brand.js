const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: Boolean, default: true }
});

const Brand = mongoose.model('Brand', BrandSchema);
module.exports = Brand;
