const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const service = require("../services/product");

const get = catchAsync(async (req, res) => {
  const result = await service.get();
  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
});

const getById = catchAsync(async (req, res, next) => {

  const result = await service.getById(req.params.id);

  if (!result) {
    return next(new AppError("No Product found with that ID", 404));
  }
  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
});

const getItems = catchAsync(async (req, res) => {
  const result = await service.getItems();
  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
});

const getItemPrices = catchAsync(async (req, res, next) => {
  const result = await service.getItemPrices(req.params.id);

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
  try {
    const result = service.add(req);
    const data = {
      success: true,
      result,
    };
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});

const update = async (req, res, next) => {
  const product = await service.getById(req.params.id)
 
  if (!product) {
    return next(new AppError("No Item found with that ID", 404));
  }

  const results = await service.update(req, product);
  
  const data = {
    success: true,
    results,
  };
  return res.status(200).send(data);
};

const remove = catchAsync(async (req, res, next) => {
  const result = await service.remove(req.params.id);
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
  getItems,
  getItemPrices,
  add,
  update,
  remove,
};
