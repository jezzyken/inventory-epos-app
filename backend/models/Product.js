const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    productCode: {
      type: String,
    },
    description: {
      type: String,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    criticalLimit: {
      type: Number,
      default: 5,
    },
    image: {
      type: String,
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
    },
    type: {
      type: String,
      enum: ["Standard", "Variants"],
      default: "Standard",
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
    stocks: {
      type: Number,
    },
    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
