const Models = require("../models/Unit");

const get = async (req, res) => {
  const result = await Models.find();
  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
};

const getById = async (req, res) => {
  const result = await Models.findById(req.params.id);
  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
};

const add = async (req, res) => {

  const item = new Models(req.body)

  const result = await item.save();

  const data = {
    success: true,
    result
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
  const data = {
    msg: `delete product with id of ${req.params.id}`,
    success: true,
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
