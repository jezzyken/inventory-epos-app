const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const service = require("../services/auth");

const create = catchAsync(async (req, res) => {
  const result = await service.create(req.body);
  const data = {
    success: true,
    result,
  };
  return res.status(201).send(data);
});

const login = catchAsync(async (req, res) => {
  const { token, user } = await service.login(req.body);

  return res.status(200).send({ token, user, success: true });
});

module.exports = {
  create,
  login,
};
