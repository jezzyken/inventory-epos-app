const Models = require("../../models/ItemPrice");
const ObjectId = require("mongoose").Types.ObjectId;

const get = async () => {
  const result = await customPopulate(Models.find());
  return result;
};

const getById = async (id) => {
  console.log(id)
  const result = await customPopulate(Models.findById(id));
  return result;
};

const getByProductId = async (id) => {
  const result = await customPopulate(Models.find({product: id }));
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

const customPopulate = (query) => {
  return query
    .populate({ path: "unit", select: "name" })
    .populate({ path: "variant", select: "name" });
};

module.exports = {
  get,
  getById,
  getByProductId,
  remove,
  add,
  update,
};
