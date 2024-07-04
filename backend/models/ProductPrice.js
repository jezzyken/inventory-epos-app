const mongoose = require("mongoose");

const productPriceSchema = new mongoose.Schema(
  {
    skuCode: {
      type: String,
    },
    productCost: {
      type: String,
    },
    sellingPrice: {
      type: String,
    },
    stockAlert: {
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

const ProductPrice = mongoose.model("ProductPrice", productPriceSchema);

module.exports = ProductPrice;
