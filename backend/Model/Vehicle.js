const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  brand_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  name: { type: String, required: true },
  images: [{ type: String, required: true }],
  vehicle_type: [
    {
      type: String,
      enum: ["P", "D", "C", "E"], // Allowed values: 'P' (Petrol), 'D' (Diesel), 'C' (CNG), 'E' (Electric)
      required: true,
    },
  ],
  transmission: [{ type: String, enum: ["A", "M", "I"], required: true }],
  engine_size: { type: String, required: true },
  overview: { type: String, required: true },
  variants: [
    {
      name: { type: String, required: true },
      engine_size: { type: String, required: true },
      transmission_type: [{ type: String, required: true }], // Adjusted to allow multiple transmission types as an array of strings
      price: { type: Number, required: true },
    },
  ],
  city_price: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  colors: [
    {
      name: { type: String, required: true }, // Color name, e.g., "Red", "Blue", "Silver"
      image_url: { type: String, required: true }, // URL of the image showing the car in this color
    },
  ],
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema);
module.exports = Vehicle;
