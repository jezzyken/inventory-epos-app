const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    values: [{ type: String }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamp: true,
  }
);

const Variant = mongoose.model("Variant", variantSchema);

module.exports = Variant;
