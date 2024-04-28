const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    productCode: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    criticalLimit: {
      type: String,
      required: true,
      default: 5
    },
    image: {
      type: String,
    }
  },
  {
    timestamp: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
