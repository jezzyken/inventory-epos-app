const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    referenceCode: {
      type: String,
    },
    recievedAmount: {
      type: String,
    },
    paidAmount: {
      type: String,
    },
    paymentType: {
      type: String,
      default: "Cash",
    },
    change: {
      type: String,
    },
    totalSales: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hasDelivery: {
      type: Boolean,
      default: false,
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
