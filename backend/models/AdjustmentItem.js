const mongoose = require("mongoose");

const adjustmentItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    variant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
    },
    adjustment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Adjustment",
    },
    quantity: {
      type: Number ,
    },
    operation: {
      type: String,
      enum: ["Addition", "Subtraction"]
    },
  },
  {
    timestamp: true,
  }
);

const AdjustmentItem = mongoose.model("AdjustmentItem", adjustmentItemSchema);

module.exports = AdjustmentItem;
