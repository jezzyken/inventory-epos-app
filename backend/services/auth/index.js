const Model = require("../../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/jwtUtils");

const create = async ({ fname, mname, lname, email, password, role }) => {
  let user = await Model.findOne({ email });
  if (user) {
    throw new Error("User already exists");
  }

  user = new Model({
    fname,
    mname,
    lname,
    email,
    password,
    role,
  });

  await user.save();
  return user;
};

const login = async ({ email, password }) => {
  const user = await Model.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const payload = {
    user: {
      id: user.id,
      role: user.role,
    },
  };

  const token = generateToken(payload);
  return { token, user };
};

module.exports = {
  create,
  login,
};
