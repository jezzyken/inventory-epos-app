const Models = require("../../models/Sale");
const ModelSaleItems = require("../../models/SalesItem");
const ModelDelivery= require("../../models/Delivery");
const ModelCustomer= require("../../models/Customer");


const get = async () => {
  const result = await Models.find();
  return result;
};

const getById = async (id) => {
  const result = await Models.findById(id);
  return result;
};

const add = async (req) => {
  const saleData = req.body;

  const newSale = new Models({
    paidAmount: saleData.paidAmount,
    paymentType: saleData.paymentType || 'Cash',
    change: saleData.change,
    totalSalesAmount: saleData.totalSalesAmount,
    totalItems: saleData.totalItems,
    hasDelivery: saleData.hasDelivery,
  });

  const savedSale = await newSale.save();

   if (!!saleData.hasDelivery) {
    const deliveryData = saleData.delivery;
    const newDelivery = new ModelDelivery({
      sale: savedSale._id,
      recipientName: deliveryData.recipientName,
      contactNo: deliveryData.contactNo,
      address: deliveryData.address,
      notes: deliveryData.notes,
      deliveryDate: deliveryData.deliveryDate || new Date(),
    });
    await newDelivery.save();
  }

  const saleItems = saleData.saleItems.map((item) => ({
    ...item,
    sale: savedSale._id,
  }));

  const savedSaleItems = await ModelSaleItems.create(saleItems);

  const customer = new ModelCustomer({
    name: saleData.customerName,
    sale: savedSale._id
  });

  await customer.save()

  return { sale: savedSale, saleItems: savedSaleItems };
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
