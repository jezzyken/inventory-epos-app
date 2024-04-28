const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    productCode: {
      type: String,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
    },
    unit: {
      type: String,
    },
    criticalLimit: {
      type: String,
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
