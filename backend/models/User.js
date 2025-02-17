const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    mname: {
      type: String,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "Cashier"],
      default: "Cashier",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.virtual('fullName').get(function() {
  if (this.mname) {
    return `${this.fname} ${this.mname} ${this.lname}`;
  }
  return `${this.fname} ${this.lname}`;
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;