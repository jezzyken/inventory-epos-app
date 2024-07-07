const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    status: {
      type: String,
    },
    notes: {
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

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
