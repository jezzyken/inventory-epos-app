const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    name: {
      type: String,
    },
    sku: {
      type: String,
    },
    productCost: {
      type: String,
    },
    sellingPrice: {
      type: String,
    },
    attributes: [
      {
        key: String,
        value: mongoose.Schema.Types.Mixed,
      },
    ],
    stockAlert: {
      type: Number,
      default: 5
    },
    stocks: {
      type: Number
    },
  },
  {
    timestamps: true,
  }
);

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);

module.exports = ProductVariant;
