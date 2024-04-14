const mongoose = require("mongoose");

const itemPriceSchema = new mongoose.Schema(
  {
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit"
    },
    variant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant"
    },
    itemPrice: {
      type: String,
    },
    salePrice: {
      type: String,
    },
    product:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
  },
  {
    timestamps: true,
  }
);

const ItemPrice = mongoose.model("ItemPrice", itemPriceSchema);

module.exports = ItemPrice;
