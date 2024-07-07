const Models = require("../../models/AdjustmentItem");
const ProductVariantModel = require("../../models/ProductVariant");
const ProductModel = require("../../models/Product");

const ObjectId = require("mongoose").Types.ObjectId;

const get = async () => {
  const result = await customPopulate(Models.find());
  return result;
};

const getById = async (id) => {
  const result = await customPopulate(Models.findById(id));
  return result;
};

const getStockItems = async (id) => {
  const pipeline = [
    {
      $match: {
        product: new ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "suppliers",
        localField: "supplier",
        foreignField: "_id",
        as: "supplier",
      },
    },
    {
      $lookup: {
        from: "variants",
        localField: "variant",
        foreignField: "_id",
        as: "variant",
      },
    },
    {
      $unwind: "$supplier",
    },
    {
      $unwind: "$variant",
    },
    {
      $group: {
        _id: {
          product: "$product",
          variant: "$variant._id",
          supplier: "$supplier._id",
        },
        totalQuantity: { $sum: { $toInt: "$quantity" } },
        items: { $push: "$$ROOT" },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            { totalQuantity: "$totalQuantity" },
            { $arrayElemAt: ["$items", 0] },
          ],
        },
      },
    },
    {
      $project: {
        items: 0,
      },
    },
  ];
  const result = await Models.aggregate(pipeline);
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

const remove = async (stockItem) => {
  const previousQuantity = stockItem.quantity;
  const { product, variant } = stockItem;

  await stockItem.deleteOne();

  if (variant) {
    const productVariant = await ProductVariantModel.findById(variant);
    if (productVariant) {
      productVariant.stocks -= previousQuantity;
      await productVariant.save();

      const productDoc = await ProductModel.findById(product);
      if (productDoc) {
        const variants = await ProductVariantModel.find({
          _id: { $in: productDoc.variants },
        });
        productDoc.stocks = variants.reduce((acc, v) => acc + v.stocks, 0);
        await productDoc.save();
      }
    }
  } else {
    const productDoc = await ProductModel.findById(product);
    if (productDoc) {
      productDoc.stocks -= previousQuantity;
      await productDoc.save();
    }
  }
};

const customPopulate = (query) => {
  return query
    .populate({ path: "product", select: "name productCode" })
    .populate({ path: "supplier", select: "name" })
    .populate({ path: "variant" });
};

module.exports = {
  get,
  getById,
  getStockItems,
  remove,
  add,
  update,
};
