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

const login = async ({ email, password, isMobile = false }) => {
  const user = await Model.findOne({ email });

  console.log(user)
  console.log(email, password, isMobile)

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Add status check
  if (user.status !== 'active') {
    throw new Error("Account is not active. Please contact support.");
  }

  if (user.role === 'Admin' && isMobile) {
    throw new Error("Admin access not allowed on mobile devices");
  }

  if (user.role === 'Cashier' && !isMobile) {
    throw new Error("Non-admin access not allowed on desktop devices");
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
