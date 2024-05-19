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
      $unwind: "$prices",
    },
    {
      $lookup: {
        from: "units",
        localField: "prices.unit",
        foreignField: "_id",
        as: "unitDetails",
      },
    },
    {
      $lookup: {
        from: "variants",
        localField: "prices.variant",
        foreignField: "_id",
        as: "variantDetails",
      },
    },

    {
      $unwind: {
        path: "$unitDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$variantDetails",
        preserveNullAndEmptyArrays: true,
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
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        description: { $first: "$description" },
        productCode: { $first: "$productCode" },
        brand: { $first: "$brand" },
        category: { $first: "$category" },
        criticalLimit: { $first: "$criticalLimit" },
        image: { $first: "$image" },
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
        stocksQuantity: { $first: "$stocksQuantity" },
        __v: { $first: "$__v" },
        stocksQuantity: { $first: "$stocksQuantity" },
        prices: {
          $push: {
            _id: "$prices._id",
            unit: "$unitDetails",
            variant: "$variantDetails",
            itemPrice: "$prices.itemPrice",
            salePrice: "$prices.salePrice",
          },
        },
      },
    },
    {
      $sort: {
        _id: -1
      }
    }
  ]);

  return result;
};

const getItemPrices = async (id) => {
  const result = await Models.aggregate([
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
    {
      $unwind: "$prices",
    },
    {
      $lookup: {
        from: "variants",
        localField: "prices.variant",
        foreignField: "_id",
        as: "prices.variant",
      },
    },
    {
      $unwind: "$prices.variant",
    },
    {
      $lookup: {
        from: "units",
        localField: "prices.unit",
        foreignField: "_id",
        as: "prices.unit",
      },
    },
    {
      $unwind: "$prices.unit",
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        prices: { $push: "$prices" },
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
  getItemPrices,
  add,
  update,
  remove,
};
