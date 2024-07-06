const Models = require("../../models/Product");
const ProductVariantModel = require("../../models/ProductVariant");

const ObjectId = require("mongoose").Types.ObjectId;

const get = async () => {
  const result = await customPopulate(Models.find());
  return result;
};

const getItems = async () => {
  const result = Models.aggregate([
    {
      $lookup: {
        from: "productvariants",
        localField: "variants",
        foreignField: "_id",
        as: "variants",
      },
    },
    {
      $unwind: {
        path: "$variants",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  return result
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
      $lookup: {
        from: "colors",
        localField: "prices.color",
        foreignField: "_id",
        as: "prices.color",
      },
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
    type,
    image,
    productCode,
    category,
    brand,
    criticalLimit,
    description,
    unit,
    productCost,
    sellingPrice,
    supplier,
    variants,
  } = req.body;

  const productData = {
    name,
    type,
    image,
    productCode,
    category,
    brand,
    criticalLimit,
    description,
    unit,
    productCost,
    sellingPrice,
    supplier,
    variants,
  };

  const product = new Models(productData);

  if (type === "Variants") {
    const productVariant = await ProductVariantModel.insertMany(variants);
    product.variants = productVariant.map((variant) => variant._id);
    product.save();
    return;
  }

  return await product.save();
};

const update = async (req, product) => {
  const {
    name,
    type,
    image,
    productCode,
    category,
    brand,
    criticalLimit,
    description,
    unit,
    productCost,
    sellingPrice,
    supplier,
    variants,
  } = req.body;

  product.name = name || product.name;
  product.productCode = productCode || product.productCode;
  product.type = type || product.type;
  product.description = description || product.description;
  product.criticalLimit = criticalLimit || product.criticalLimit;
  product.category = category || product.category._id;
  product.supplier = supplier || product.supplier._id;
  product.unit = unit || product.unit._id;
  product.brand = brand || product.brand._id;
  product.sellingPrice = sellingPrice || product.sellingPrice;
  product.productCost = productCost || product.productCost;
  product.image = image || product.image;

  if (variants && variants.length > 0) {
    for (const variant of variants) {
      if (variant._id) {
        await ProductVariantModel.findByIdAndUpdate(variant._id, variant, {
          new: true,
        });
      } else {
        const newVariant = new ProductVariantModel({
          productId: product._id,
          ...variant,
        });
        await newVariant.save();
        product.variants.push(newVariant._id);
      }
    }
  }

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
    .populate({ path: "supplier", select: "name" })
    .populate({ path: "unit", select: "name" })
    .populate({ path: "variants" });
};

module.exports = {
  get,
  getById,
  getItems,
  getItemPrices,
  add,
  update,
  remove,
};
