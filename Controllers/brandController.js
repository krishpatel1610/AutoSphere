const Brand = require('../Model/Brand');
const mongoose = require('mongoose');

// Create a new brand
exports.createBrand = async (req, res) => {
    try {
        const brand = new Brand(req.body);
        await brand.save();
        res.status(201).send(brand);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all brands
exports.getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.send(brands);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get brand by ID
exports.getBrandById = async (req, res) => {
    try {
        const brandId = req.params.brandId;
        const brand = await Brand.findById(brandId);
        if (!brand) {
            return res.status(404).send('Brand not found');
        }
        res.send(brand);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete a brand
exports.deleteBrand = async (req, res) => {
    try {
        const brandId = req.params.brandId;

        // Check if the ID is a valid MongoDB ObjectID
        if (!mongoose.Types.ObjectId.isValid(brandId)) {
            return res.status(400).json({ message: 'Invalid brand ID format' });
        }

        const brand = await Brand.findByIdAndDelete(brandId);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.status(200).send({ message: 'Brand deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
