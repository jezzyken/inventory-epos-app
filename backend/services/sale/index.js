const Models = require("../../models/Sale");
const SalesItemModel = require("../../models/SalesItem");
const ProductModel = require("../../models/Product");
const ProductVariantModel = require("../../models/ProductVariant");

const ObjectId = require("mongoose").Types.ObjectId;

const get = async () => {
  const result = await Models.aggregate([
    {
      $lookup: {
        from: "saleitems",
        localField: "_id",
        foreignField: "sale",
        as: "sale",
      },
    },
    {
      $addFields: {
        noOfItems: {
          $size: "$sale",
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

  console.log(id)
  const result = await Models.aggregate([
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "saleitems",
        localField: "_id",
        foreignField: "sale",
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
        amountReceived: {
          $first: "$referenceCode",
        },
        amountReceived: {
          $first: "$amountReceived",
        },
        discount: {
          $first: "$discount",
        },
        salesTotal: {
          $first: "$salesTotal",
        },
        paymentType: {
          $first: "$paymentType",
        },
        change: {
          $first: "$change",
        },
        grandTotal: {
          $first: "$grandTotal",
        },
        hasDelivery: {
          $first: "$hasDelivery",
        },
        customer: {
          $first: "$customer",
        },
        notes: {
          $first: "$notes",
        },
        items: {
          $push: {
            item_id: "$items._id",
            product: "$productDetails",
            variant: "$variantDetails",
            quantity: "$items.quantity",
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

const add = async (req) => {
  const { stocks } = req.body;

  const sale = new Models(req.body);

  const savedSale = await sale.save();

  for (const itemData of stocks) {
    const saleItem = new SalesItemModel({
      product: itemData.product,
      variant: itemData.variant,
      sale: savedSale._id,
      quantity: itemData.quantity,
      price: itemData.price,
    });
    await saleItem.save();

    if (itemData.variant) {
      const variant = await ProductVariantModel.findById(itemData.variant);
      if (variant) {
        variant.stocks -= itemData.quantity;
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
        product.stocks -= itemData.quantity;
        await product.save();
      }
    }
  }

  return savedSale;
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
