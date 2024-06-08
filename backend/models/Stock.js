const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    variant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
    },
    quantity: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamp: true,
  }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
