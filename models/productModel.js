import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided ⚠️"],
  },
  price: {
    type: Number,
    required: [true, "product price must be provided ⚠️"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Fixed default date handling
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported ⚠️",
    },
  },
});

// Consistent model naming
const ProductModel =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default ProductModel;
