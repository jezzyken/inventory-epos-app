const { verifyToken } = require("../utils/jwtUtils");
const AppError = require("../utils/appError");

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log(token)

  if (!token) {
    return next(new AppError("No token provided, authorization denied", 401));
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded.user;
    next();
  } catch (err) {
    return next(new AppError("Token is not valid", 401));
  }
};

module.exports = protect;
