const Models = require("../../models/Brand");

const get = async () => {
  const result = await Models.find();
  return result;
};

const getById = async (id) => {
  const result = await Models.findById(id);
  return result;
};

const add = async (req) => {
  const item = new Models(req.body);
  const result = await item.save();
  return result;
};

const remove = async (id) => {
  const result = await Models.findByIdAndDelete(id);
  return result;
};

const update = async (id, data) => {
  const results = await Models.findByIdAndUpdate(id, data, {
    new: true,
  });
  return results;
};

module.exports = {
  get,
  getById,
  remove,
  add,
  update,
};
