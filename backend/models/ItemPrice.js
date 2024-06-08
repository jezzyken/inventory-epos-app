const mongoose = require("mongoose");

const itemPriceSchema = new mongoose.Schema(
  {
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
    },
    variant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
    },
    color: [{ type: mongoose.Schema.Types.ObjectId, ref: "Color" }],
    hasColorProperties: {
      type: String,
    },
    itemPrice: {
      type: String,
    },
    salePrice: {
      type: String,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

const ItemPrice = mongoose.model("ItemPrice", itemPriceSchema);

module.exports = ItemPrice;
