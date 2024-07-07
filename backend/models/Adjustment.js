const mongoose = require("mongoose");

const adjustmentSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
    },
    referenceNo: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamp: true,
  }
);

const Adjustment = mongoose.model("Adjustment", adjustmentSchema);

module.exports = Adjustment;
