const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    sale: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale",
    },
    recipientName: {
      type: String,
    },
    contactNo: {
      type: String,
    },
    address: {
      type: String,
    },
    notes: {
      type: String,
    },
    deliveryDate: {
      type: Date,
      default: Date.now(),
    },
    deliveryFee: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["delivered", "pending"],
      default: "pending",
    },
    markBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamp: true,
  }
);

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
