const mongoose = require("mongoose");

const variantItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

const VariantItems = mongoose.model("VariantItemsItem", variantItemSchema);

module.exports = VariantItems;
