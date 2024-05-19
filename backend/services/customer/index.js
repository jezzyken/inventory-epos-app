const Models = require("../../models/Customer");

const get = async () => {
  console.log('get customers')
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

const update = async (id, data) => {
  const results = await Models.findByIdAndUpdate(id, data, {
    new: true,
  });
  return results;
};

const remove = async (id) => {
  const result = await Models.findByIdAndDelete(id);
  return result;
};

module.exports = {
  get,
  getById,
  remove,
  add,
  update,
};
