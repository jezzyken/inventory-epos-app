const Models = require("../../models/Product");
const ItemPriceModel = require("../../models/ItemPrice");

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
    price,
  } = req.body;

  const productData = {
    name,
    productCode,
    category,
    brand,
    criticalLimit,
    description,
    image,
  };
  

  const product = await Models.create(productData);

  console.log(product);

  const savedItemPrices = await Promise.all(
    price.map(async (itemPriceData) => {
      itemPriceData.product = product._id;
      const itemPrice = await ItemPriceModel.create(itemPriceData);
      return itemPrice._id;
    })
  );

  product.price = savedItemPrices;

  await product.save();
  // const item = new Models(req.body);
  // const result = await item.save();
  // return product;
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
  add,
};
