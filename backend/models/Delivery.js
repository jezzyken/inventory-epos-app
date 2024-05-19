const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    sale:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale"
    },
    name: {
      type: String,
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
      default: Date.now()
    },
    status: {
      type: String,
      enum: ["delivered", "pending"],
      default: "pending"
    }
  },
  {
    timestamp: true,
  }
);

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
