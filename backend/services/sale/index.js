const Models = require("../../models/Sale");
const SalesItemModel = require("../../models/SalesItem");
const ProductModel = require("../../models/Product");
const ProductVariantModel = require("../../models/ProductVariant");
const DeliveryModel = require("../../models/Delivery");

const ObjectId = require("mongoose").Types.ObjectId;

const get = async () => {
  const result = await Models.aggregate([
    {
      $lookup: {
        from: "saleitems",
        localField: "_id",
        foreignField: "sale",
        as: "items",
      },
    },
    {
      $addFields: {
        noOfItems: {
          $size: "$items",
        },
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
        date: {
          $first: "$date",
        },
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
        referenceCode: {
          $first: "$referenceCode",
        },
        noOfItems: {
          $first: "$noOfItems",
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

const getById = async (id) => {
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
        date: {
          $first: "$date",
        },
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
  try {
    const { stocks, hasDelivery, delivery } = req.body;

    const sale = new Models(req.body);

    const savedSale = await sale.save();

    if (hasDelivery) {
      const newDelivery = new DeliveryModel(delivery);
      newDelivery.sale = sale._id;
      await newDelivery.save();
    }

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
  } catch (error) {
    console.error("Error adding sale:", error);
    throw new Error("Failed to add sale");
  }
};

const update = async (id, data) => {
  const {
    date,
    amountReceived,
    discount,
    salesTotal,
    paymentType,
    change,
    grandTotal,
    notes,
    stocks,
    customer,
    deletedItems,
    hasDelivery,
    delivery,
  } = data;

  const sale = await Models.findById(id);

  sale.date = date;
  sale.amountReceived = amountReceived;
  sale.discount = discount;
  sale.salesTotal = salesTotal;
  sale.paymentType = paymentType;
  sale.change = change;
  sale.grandTotal = grandTotal;
  sale.notes = notes;
  sale.customer = customer;

  const results = await sale.save();

  if (deletedItems && deletedItems.length > 0) {
    for (const itemId of deletedItems) {
      const saleItem = await SalesItemModel.findById(itemId);
      if (saleItem) {
        const previousQuantity = saleItem.quantity;

        if (saleItem.variant) {
          const variant = await ProductVariantModel.findById(saleItem.variant);
          if (variant) {
            variant.stocks += previousQuantity;
            await variant.save();
          }
        } else {
          const product = await ProductModel.findById(saleItem.product);
          if (product) {
            product.stocks += previousQuantity;
            await product.save();
          }
        }

        await SalesItemModel.findByIdAndDelete(itemId);
      }
    }
  }

  for (const stockData of stocks) {
    const stockItemId = stockData.items_id;
    const quantity = stockData.quantity;
    const subTotal = stockData.subTotal;

    let stockItem;
    let previousQuantity = 0;
    let currentQuantity = quantity;

    if (stockItemId) {
      stockItem = await SalesItemModel.findById(stockItemId);
      if (!stockItem) {
        throw new Error(`StockItem with ID ${stockItemId} not found`);
      }
      previousQuantity = stockItem.quantity;
      stockItem.quantity = quantity;
      stockItem.subTotal = subTotal;
      await stockItem.save();

      currentQuantity = quantity;
    } else {
      stockItem = new SalesItemModel({
        product: stockData.product,
        variant: stockData.variant,
        sale: id,
        quantity: stockData.quantity,
        subTotal: stockData.subTotal,
      });
      await stockItem.save();
    }

    if (previousQuantity !== currentQuantity) {
      const quantityChange = currentQuantity - previousQuantity;

      if (stockData.variant) {
        const variant = await ProductVariantModel.findById(stockData.variant);
        if (variant) {
          if (quantityChange > 0) {
            variant.stocks -= Math.abs(quantityChange);
          } else {
            variant.stocks += Math.abs(quantityChange);
          }
          await variant.save();

          const product = await ProductModel.findById(stockData.product);
          if (product) {
            const variants = await ProductVariantModel.find({
              _id: { $in: product.variants },
            });
            product.stocks = variants.reduce((acc, v) => acc + v.stocks, 0);
            await product.save();
          }
        }
      } else {
        const product = await ProductModel.findById(stockData.product);
        if (product) {
          if (quantityChange > 0) {
            product.stocks -= Math.abs(quantityChange);
          } else {
            product.stocks += Math.abs(quantityChange);
          }
          await product.save();
        }
      }
    }
  }

  if (hasDelivery) {
    let deliveryRecord = await DeliveryModel.findOne({ sale: id });
    if (!deliveryRecord) {
      deliveryRecord = new DeliveryModel({
        sale: id,
        ...delivery,
      });
    } else {
      deliveryRecord.recipientName = delivery.recipientName;
      deliveryRecord.contactNo = delivery.contactNo;
      deliveryRecord.address = delivery.address;
      deliveryRecord.notes = delivery.notes;
      deliveryRecord.deliveryDate = delivery.deliveryDate;
      deliveryRecord.deliveryFee = delivery.deliveryFee;
      deliveryRecord.status = delivery.status;
    }
    await deliveryRecord.save();
  }
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
