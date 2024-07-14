const Models = require("../../models/Delivery");
const ObjectId = require("mongoose").Types.ObjectId;

const get = async () => {
  const result = await Models.find();
  return result;
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

const update = async (id, status) => {
  const result = await Models.updateOne(
    { _id: id },
    {
      $set: {
        status,
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
