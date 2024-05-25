const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
    },
    mname: {
      type: String,
    },
    lname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
    },
    image: {
      type: String,
    }
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
