const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    referenceNo: {
      type: String,
      unique: true,
    },
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
    timestamps: true,
  }
);

stockSchema.pre("save", async function (next) {
  try {
    if (!this.isNew) {
      return next();
    }

    const year = new Date().getFullYear();

    const lastStock = await this.constructor.findOne(
      {},
      {},
      { sort: { referenceNo: -1 } }
    );

    let nextNumber = 1;
    if (lastStock && lastStock.referenceNo) {
      const lastNumber = parseInt(lastStock.referenceNo.split("-")[2]);
      nextNumber = lastNumber + 1;
    }

    this.referenceNo = `STK-${year}-${String(nextNumber).padStart(4, "0")}`;
    next();
  } catch (error) {
    next(error);
  }
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
