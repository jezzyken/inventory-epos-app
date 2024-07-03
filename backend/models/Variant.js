const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    items: [{ type: String }],
  },
  {
    timestamp: true,
  }
);

const Variant = mongoose.model("Variant", variantSchema);

module.exports = Variant;
