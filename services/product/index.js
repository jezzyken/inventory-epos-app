const Models = require("../../models/Product");
const ObjectId = require("mongoose").Types.ObjectId;

const get = async () => {
  const result = await Models.aggregate([
    {
      $lookup: {
        from: "brands",
        localField: "brand",
        foreignField: "_id",
        as: "brand",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$brand",
    },
    {
      $unwind: "$category",
    },
    {
      $lookup: {
        from: "stocks",
        localField: "_id",
        foreignField: "product",
        as: "stocksQuantity",
      },
    },
    {
      $addFields: {
        stocksQuantity: {
          $sum: {
            $map: {
              input: "$stocksQuantity",
              as: "stock",
              in: {
                $toInt: "$$stock.quantity",
              },
            },
          },
        },
      },
    },
  ]);

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
    .populate({ path: "brand", select: "name" })
    .populate({ path: "category", select: "name" })
    .populate({ path: "prices.unit", select: "name" })
    .populate({ path: "prices.variant", select: "name" });
};

module.exports = {
  get,
  getById,
  add,
  update,
  remove,
};
