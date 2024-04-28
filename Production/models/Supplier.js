const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    company: {
      type: String,
    },
    email: {
      type: String,
    },
    contactNo: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
