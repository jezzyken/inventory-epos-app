const Models = require("../models/Product");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const productService = require("../services/product/productService");

const get = catchAsync(async (req, res) => {
  const result = await productService.get();
  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
});

const getById = catchAsync(async (req, res, next) => {
  const result = await productService.getById(req.params.id);

  if (!result) {
    return next(new AppError("No Product found with that ID", 404));
  }
  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
});

const add = catchAsync(async (req, res) => {
  const result = await productService.add(req);

  const data = {
    success: true,
    result,
  };
  
  return res.status(200).send(data);
});

const update = async (req, res) => {
  const data = {
    msg: `update product with id of ${req.params.id}`,
    success: true,
  };
  return res.status(200).send(data);
};

const remove = catchAsync(async (req, res, next) => {
  const result = await productService.remove(req.params.id);

  if (!result) {
    return next(new AppError("No Product found with that ID", 404));
  }

  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
});

module.exports = {
  get,
  getById,
  add,
  update,
  remove,
};
