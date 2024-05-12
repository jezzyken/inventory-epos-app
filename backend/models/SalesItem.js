const mongoose = require("mongoose");

const saleItemSchema = new mongoose.Schema(
  {
    product:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    user:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    itemPrice: {
      type: String,
    },
    salePrice: {
      type: String,
    },
    quantity: {
      type: String,
    },
    sale:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale"
    }
  },
  {
    timestamp: true,
  }
);

const SaleItem = mongoose.model("SaleItem", saleItemSchema);

module.exports = SaleItem;
