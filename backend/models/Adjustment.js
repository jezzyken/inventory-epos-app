const mongoose = require("mongoose");

const adjustmentSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
    },
    referenceNo: {
      type: String,
      unique: true,
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

adjustmentSchema.pre("save", async function (next) {
  try {
    if (!this.referenceNo) {
      const year = new Date().getFullYear();

      const lastAdjustment = await this.constructor.findOne(
        {},
        {},
        { sort: { referenceNo: -1 } }
      );

      let nextNumber = 1;
      if (lastAdjustment && lastAdjustment.referenceNo) {
        const lastNumber = parseInt(lastAdjustment.referenceNo.split("-")[1]);
        nextNumber = lastNumber + 1;
      }

      this.referenceNo = `ADJ-${year}-${String(nextNumber).padStart(4, "0")}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Adjustment = mongoose.model("Adjustment", adjustmentSchema);

module.exports = Adjustment;
