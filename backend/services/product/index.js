const Models = require("../../models/Product");
const ItemPriceModel = require("../../models/ItemPrice");
const ObjectId = require("mongoose").Types.ObjectId;

const get = async () => {
  const result = await customPopulate(Models.find());
  return result;
};

const getById = async (id) => {
  const result = await customPopulate(Models.findById(id));
  return result;
};

const add = async (req) => {
  const {
    name,
    productCode,
    category,
    brand,
    criticalLimit,
    description,
    image,
    prices,
  } = req.body;

  const productData = {
    name,
    productCode,
    category,
    brand,
    criticalLimit,
    description,
    image,
    prices,
  };

  const product = await Models.create(productData);

  return await product.save();
};

const remove = async (id) => {
  const result = await Models.findByIdAndDelete(id);
  return result;
};

const customPopulate = (query) => {
  return query
    .populate({ path: "brand", select: "name" })
    .populate({ path: "category", select: "name" })
    .populate({ path: "prices.unit", select: "name" })
    .populate({ path: "prices.variant", select: "name" });

  // .populate({
  //   path: "price",
  //   select: "salePrice itemPrice",
  //   populate: [
  //     { path: "unit", select: "name" },
  //     { path: "variant", select: "name" },
  //   ],
  // });
};

module.exports = {
  get,
  getById,
  remove,
  add,
};
