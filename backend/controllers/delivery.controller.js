const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const service = require("../services/delivery");

const get = catchAsync(async (req, res) => {
  const result = await service.get();
  const data = {
    success: true,
    result,
  };

  console.log(result)
  return res.status(200).send(data);
});

const getById = catchAsync(async (req, res, next) => {
  const result = await service.getById(req.params.id);

  if (!result) {
    return next(new AppError("No Item found with that ID", 404));
  }
  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
});

const getBySalesId = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const result = await service.getBySalesId(req.params.id);

  if (!result) {
    return next(new AppError("No Item found with that ID", 404));
  }
  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
});

const add = catchAsync(async (req, res) => {
  const result = await service.add(req);
  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
});

const update = catchAsync(async (req, res, next) => {

  const results = await service.update(req.params.id, req.body.status);
  if (!results) {
    return next(new AppError("No Item found with that ID", 404));
  }
  const data = {
    success: true,
    results,
  };
  return res.status(200).send(data);
});

const remove = catchAsync(async (req, res) => {
  const result = await service.remove(req.params.id);
  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
});

module.exports = {
  get,
  getById,
  getBySalesId,
  add,
  update,
  remove,
};
