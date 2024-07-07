const mongoose = require("mongoose");

const stockItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
    },
    variant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    quantity: {
      type: Number ,
    },

  },
  {
    timestamp: true,
  }
);

const StockItem = mongoose.model("StockItem", stockItemSchema);

module.exports = StockItem;
