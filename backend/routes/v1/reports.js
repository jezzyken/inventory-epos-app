const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");
const Product = require("../../models/Product");
const Sale = require("../../models/Sale");
const SaleItem = require("../../models/SalesItem");
const Stock = require("../../models/Stock");
const StockItem = require("../../models/StockItem");

// Product Report
router.get("/products", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = {};
    if (startDate && endDate) {
      query.createdAt = {
        $gte: moment(startDate).tz('Asia/Singapore').startOf('day').toDate(),
        $lte: moment(endDate).tz('Asia/Singapore').endOf('day').toDate(),
      };
    }

    const products = await Product.find(query)
      .populate("brand")
      .populate("category")
      .populate("supplier")
      .populate("unit")
      .populate("variants");

    const report = products.map((product) => ({
      name: product.name,
      productCode: product.productCode,
      brand: product.brand?.name,
      category: product.category?.name,
      supplier: product.supplier?.name,
      stocks: product.stocks,
      productCost: product.productCost,
      sellingPrice: product.sellingPrice,
      type: product.type,
      criticalLimit: product.criticalLimit,
    }));

    res.json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Inventory Report
router.get("/inventory", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = {};
    if (startDate && endDate) {
      query.date = {
        $gte: moment(startDate).tz('Asia/Singapore').startOf('day').toDate(),
        $lte: moment(endDate).tz('Asia/Singapore').endOf('day').toDate(),
      };
    }

    const stockMovements = await StockItem.find(query)
      .populate({
        path: "product",
        populate: ["brand", "category", "supplier"],
      })
      .populate("variant")
      .populate("stock")
      .populate("supplier");

    const report = stockMovements.map((item) => ({
      productName: item.product?.name,
      productCode: item.product?.productCode,
      variantName: item.variant?.name,
      quantity: item.quantity,
      status: item.stock?.status,
      supplier: item.supplier?.name,
      date: moment(item.stock?.date).tz('Asia/Singapore').format('YYYY-MM-DD HH:mm:ss'),
      notes: item.stock?.notes,
    }));

    res.json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Sales Report
router.get("/sales", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = {};
    if (startDate && endDate) {
      query.date = {
        $gte: moment(startDate).tz('Asia/Singapore').startOf('day').toDate(),
        $lte: moment(endDate).tz('Asia/Singapore').endOf('day').toDate(),
      };
    }

    const sales = await Sale.find(query).populate("user");

    console.log({sales})

    const salesDetails = await Promise.all(
      sales.map(async (sale) => {
        const saleItems = await SaleItem.find({ sale: sale._id })
          .populate("product")
          .populate("variant");

        const items = saleItems.map((item) => ({
          productName: item.product?.name,
          variantName: item.variant?.name,
          quantity: item.quantity,
          subTotal: item.subTotal,
        }));

        return {
          date: moment(sale.date).tz('Asia/Singapore').format('YYYY-MM-DD HH:mm:ss'),
          referenceCode: sale.referenceCode,
          customer: sale.customer,
          salesPerson: sale.user?.name,
          items: items,
          discount: sale.discount,
          salesTotal: sale.salesTotal,
          grandTotal: sale.grandTotal,
          paymentType: sale.paymentType,
          amountReceived: sale.amountReceived,
          change: sale.change,
          notes: sale.notes,
        };
      })
    );

    res.json({ success: true, data: salesDetails });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;