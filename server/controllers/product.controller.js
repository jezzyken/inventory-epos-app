const Models = require("../models/Product");

const get = async (req, res) => {
  const product = await Models.find()
    .populate({ path: "brand", select: "name" })
    .populate({ path: "category", select: "name" })
    .populate({
      path: "price",
      select: "salePrice itemPrice",
      populate: [
        { path: "unit", select: "name" },
        { path: "variant", select: "name" },
      ],
    });

  const data = {
    success: true,
    product,
  };
  return res.status(200).send(data);
};

const getById = async (req, res) => {
  const product = await Models.findById(req.params.id);
  const data = {
    success: true,
    product,
  };
  return res.status(200).send(data);
};

const add = async (req, res) => {
  const item = new Models(req.body);

  const result = await item.save();

  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
};

const update = async (req, res) => {
  const data = {
    msg: `update product with id of ${req.params.id}`,
    success: true,
  };
  return res.status(200).send(data);
};

const remove = async (req, res) => {
  const result = await Models.findByIdAndDelete(req.params.id);
  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
};

module.exports = {
  get,
  getById,
  add,
  update,
  remove,
};