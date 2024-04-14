const Models = require("../../models/Product");

const get = async () => {
  const result = await customPopulate(Models.find());
  return result;
};

const getById = async (id) => {
  const result = await customPopulate(Models.findById(id));
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

const customPopulate = (query) => {
  return query
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
};

module.exports = {
  get,
  getById,
  remove,
  add
};
