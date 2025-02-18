const Models = require("../../models/Delivery");
const ObjectId = require("mongoose").Types.ObjectId;

const get = async () => {
  const results = await Models.aggregate([
    {
      $lookup: {
        from: "sales",
        localField: "sale",
        foreignField: "_id",
        as: "saleDetails",
      },
    },
    {
      $unwind: {
        path: "$saleDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "saleitems",
        localField: "saleDetails._id",
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
        recipientName: {
          $first: "$recipientName",
        },
        contactNo: {
          $first: "$contactNo",
        },
        address: {
          $first: "$address",
        },
        notes: {
          $first: "$notes",
        },
        deliveryDate: {
          $first: "$deliveryDate",
        },
        deliveryFee: {
          $first: "$deliveryFee",
        },
        status: {
          $first: "$status",
        },
        saleDetails: {
          $first: "$saleDetails",
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

  return results;
};

const getById = async (id) => {
  const result = await Models.findById(id);
  return result;
};

const getBySalesId = async (id) => {
  const result = await Models.find({ sale: new ObjectId(id) });
  return result;
};

const add = async (req) => {
  const item = new Models(req.body);
  const result = await item.save();
  return result;
};

const update = async (id, status, markBy) => {
  const result = await Models.updateOne(
    { _id: id },
    {
      $set: {
        status,
        markBy,
      },
    }
  );
  return result;
};

const remove = async (id) => {
  const result = await Models.findByIdAndDelete(id);
  return result;
};

module.exports = {
  get,
  getById,
  getBySalesId,
  remove,
  add,
  update,
};
