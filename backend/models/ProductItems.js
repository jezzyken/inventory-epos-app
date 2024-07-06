const mongoose = require("mongoose");

const productItemsSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
    },
    productCode: {
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

const ProductItems = mongoose.model("ProductItems", productItemsSchema);

module.exports = ProductItems;
