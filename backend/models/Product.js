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
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
    },
    type: {
      type: String,
      enum: ["Standard", "Variants"],
      default: "standard",
    },

    variationAttributes: [
      {
        name: {
          type: String,
        },
        selectedValue: {
          type: [String],
        },
        variantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variant",
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
