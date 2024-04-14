const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    quantity: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamp: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
