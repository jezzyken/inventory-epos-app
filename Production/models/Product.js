const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    productCode: {
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
    criticalLimit: {
      type: String,
      default: 5,
    },
    image: {
      type: String,
    },
    prices: [
      {
        unit: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Unit",
        },
        variant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variant",
        },
        itemPrice: {
          type: String,
        },
        salePrice: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
