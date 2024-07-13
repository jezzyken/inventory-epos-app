const mongoose = require("mongoose");

const saleItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    sale: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale",
    },
    variant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
    },
    quantity: {
      type: Number ,
    },
    subTotal: {
      type: Number ,
    },
  },
  {
    timestamp: true,
  }
);

const SaleItem = mongoose.model("SaleItem", saleItemSchema);

module.exports = SaleItem;
