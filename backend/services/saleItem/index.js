const Models = require("../../models/SalesItem");
const ObjectId = require("mongoose").Types.ObjectId;


const get = async () => {
  const result = await Models.find();
  return result;
};

const getById = async (id) => {
  const result = await Models.findById(id);
  return result;
};

const getBySaleId = async (id) => {
  const pipeline = [
    {
      $match: {
        sale: new ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "products",
        let: {
          productId: "$product",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$productId"],
              },
            },
          },
          {
            $project: {
              name: 1,
              image: 1,
            },
          },
        ],
        as: "product",
      },
    },
    {
      $lookup: {
        from: "users",
        let: {
          userId: "$user",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$userId"],
              },
            },
          },
        ],
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$product",
      },
    },
    {
      $unwind: {
        path: "$user",
      },
    },
  ];
  const result = await Models.aggregate(pipeline);
  return result;
};

const add = async (req) => {
  console.log(req.body)
  const item = new Models(req.body);
  const result = await item.save();
  return result;
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
  getBySaleId,
  remove,
  add,
  update,
};
