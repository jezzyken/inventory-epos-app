const mongoose = require("mongoose");

const homieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    codeName: {
      type: String,
    },
    password: {
      type: String,
    },
    drugUse: {
      type: String,
    },
    safeArea: {
      type: String,
    },
    hasNPass: {
      type: String,
    },
  },
  {
    timestamps: true, // Ensure this option is set correctly
  }
);

const Homie = mongoose.model("Homie", homieSchema);

module.exports = Homie;
