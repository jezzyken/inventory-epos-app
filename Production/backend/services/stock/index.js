const Models = require("../../models/Stock");
const ProductModels = require("../../models/Product");

const get = async () => {
  const result = await customPopulate(Models.find());
  return result;
};

const getById = async (id) => {
  const result = await customPopulate(Models.findById(id));
  return result;
};

const add = async (req) => {
  const result = await Models.insertMany(req.body);
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

const customPopulate = (query) => {
  return query
    .populate({ path: "product", select: "name productCode" })
    .populate({ path: "supplier", select: "name" });
};

module.exports = {
  get,
  getById,
  remove,
  add,
  update,
};
