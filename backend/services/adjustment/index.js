const Models = require("../../models/Adjustment");
const AdjustmentItemModel = require("../../models/AdjustmentItem");
const ProductModel = require("../../models/Product");
const ProductVariantModel = require("../../models/ProductVariant");

const ObjectId = require("mongoose").Types.ObjectId;

const get = async () => {
  const result = await Models.aggregate([
    {
      $lookup: {
        from: "stockitems",
        localField: "_id",
        foreignField: "stock",
        as: "stock",
      },
    },
    {
      $addFields: {
        noOfItems: {
          $size: "$stock",
        },
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
  ]);
  return result;
};

const getById = async (id) => {
  const result = await Models.aggregate([
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "adjustmentitems",
        localField: "_id",
        foreignField: "adjustment",
        as: "items",
      },
    },
    {
      $unwind: {
        path: "$items",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: {
        path: "$productDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "productvariants",
        localField: "items.variant",
        foreignField: "_id",
        as: "variantDetails",
      },
    },
    {
      $unwind: {
        path: "$variantDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        referenceNo: {
          $first: "$referenceNo",
        },
        reason: {
          $first: "$reason",
        },
        date: {
          $first: "$date",
        },
        items: {
          $push: {
            item_id: "$items._id",
            product: "$productDetails",
            variant: "$variantDetails",
            quantity: "$items.quantity",
            operation: "$items.operation",
          },
        },
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
  ]);
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
  const { reason, stocks } = req.body;

  const stock = new Models({
    reason,
  });

  const results = await stock.save();

  for (const itemData of stocks) {
    const quantity = +itemData.quantity;
    const operation = itemData.operation;
    const adjustmentId = stock._id;

    const adjustmentItem = new AdjustmentItemModel({
      product: itemData.product,
      variant: itemData.variant,
      adjustment: adjustmentId,
      quantity: itemData.quantity,
      operation: itemData.operation,
    });

    await adjustmentItem.save();

    if (itemData.variant) {
      const variant = await ProductVariantModel.findById(itemData.variant);
      if (variant) {
        if (operation === "Subtraction") {
          variant.stocks -= quantity;
        } else {
          variant.stocks += quantity;
        }

        await variant.save();

        const product = await ProductModel.findById(itemData.product);
        if (product) {
          const variants = await ProductVariantModel.find({
            _id: { $in: product.variants },
          });
          product.stocks = variants.reduce((acc, v) => acc + v.stocks, 0);
          await product.save();
        }
      }
    } else {
      const product = await ProductModel.findById(itemData.product);
      if (product) {
        if (operation === "Subtraction") {
          product.stocks -= quantity;
        } else {
          product.stocks += quantity;
        }

        await product.save();
      }
    }
  }

  return results;
};

const update = async (id, data) => {
  const { reason, stocks, deletedItems } = data;

  const adjustment = await Models.findById(id);
  adjustment.reason = reason;
  const results = await adjustment.save();

  if (deletedItems && deletedItems.length > 0) {
    for (const itemId of deletedItems) {
      const adjustmentItem = await AdjustmentItemModel.findById(itemId);
      if (adjustmentItem) {
        const previousQuantity = adjustmentItem.quantity;

        if (adjustmentItem.variant) {
          const variant = await ProductVariantModel.findById(
            adjustmentItem.variant
          );
          if (variant) {
            variant.stocks -= previousQuantity;
            await variant.save();
          }
        } else {
          const product = await ProductModel.findById(adjustmentItem.product);
          if (product) {
            product.stocks -= previousQuantity;
            await product.save();
          }
        }

        await AdjustmentItemModel.findByIdAndDelete(itemId);
      }
    }
  }

  for (const itemData of stocks) {
    const adjustmentItemId = itemData.items_id;
    const quantity = +itemData.quantity;
    const operation = itemData.operation;

    let adjustmentItem;
    let previousQuantity = 0;
    let currentQuantity = quantity;

    if (adjustmentItemId) {
      adjustmentItem = await AdjustmentItemModel.findById(adjustmentItemId);
      if (!adjustmentItem) {
        throw new Error(`AdjustmentItem with ID ${adjustmentItemId} not found`);
      }
      previousQuantity = adjustmentItem.quantity;
      adjustmentItem.quantity = quantity;
      adjustmentItem.operation = operation;
      await adjustmentItem.save();

      currentQuantity = quantity;
    } else {
      adjustmentItem = new AdjustmentItemModel({
        product: itemData.product,
        variant: itemData.variant,
        adjustment: id,
        quantity: itemData.quantity,
        operation: itemData.operation,
      });
      await adjustmentItem.save();
    }

    if (itemData.variant) {
      const variant = await ProductVariantModel.findById(itemData.variant);
      if (variant) {
        if (currentQuantity != previousQuantity) {
          if (operation === "Subtraction") {
            variant.stocks -= currentQuantity;
          } else {
            variant.stocks += currentQuantity;
          }
        }

        await variant.save();

        const product = await ProductModel.findById(itemData.product);
        if (product) {
          const variants = await ProductVariantModel.find({
            _id: { $in: product.variants },
          });
          product.stocks = variants.reduce((acc, v) => acc + v.stocks, 0);
          await product.save();
        }
      }
    } else {
      const product = await ProductModel.findById(itemData.product);
      if (product) {
        if (currentQuantity != previousQuantity) {
          if (operation === "Subtraction") {
            product.stocks -= currentQuantity;
          } else {
            product.stocks += currentQuantity;
          }
          await product.save();
        }
      }
    }
  }

  return results;
};

const remove = async (id) => {
  const result = await Models.findByIdAndDelete(id);
  return result;
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
