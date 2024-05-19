const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    sale:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale"
    }
  },
  {
    timestamp: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
