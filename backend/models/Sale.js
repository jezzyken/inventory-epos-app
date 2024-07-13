const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },
    referenceCode: {
      type: String,
    },
    amountReceived: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    salesTotal: {
      type: Number,
    },
    paymentType: {
      type: String,
      default: "Cash",
    },
    change: {
      type: Number,
    },
    grandTotal: {
      type: Number,
    },
    hasDelivery: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
    },
    customer: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamp: true,
  }
);

saleSchema.pre("save", function (next) {
  if (!this.isNew) {
    return next();
  }

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 8;
  let referenceCode = "";
  for (let i = 0; i < length; i++) {
    referenceCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  this.referenceCode = referenceCode;
  next();
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
