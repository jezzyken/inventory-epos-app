const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },
    referenceNo: {
      type: String,
      unique: true,
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
    timestamps: true,
  }
);

saleSchema.pre("save", async function (next) {
  try {
    if (!this.isNew) {
      return next();
    }

    const year = new Date().getFullYear();

    const lastSale = await this.constructor.findOne(
      {},
      {},
      { sort: { referenceNo: -1 } }
    );

    let nextNumber = 1;
    if (lastSale && lastSale.referenceNo) {
      const lastNumber = parseInt(lastSale.referenceNo.split("-")[2]);
      nextNumber = lastNumber + 1;
    }

    this.referenceNo = `SL-${year}-${String(nextNumber).padStart(4, "0")}`;
    next();
  } catch (error) {
    next(error);
  }
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
