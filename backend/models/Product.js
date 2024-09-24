import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      required: true,
    },
    supply: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", ProductSchema);
export default Product;
