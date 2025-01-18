const express = require('express');
const router = express.Router();
const Sale = require('../../models/Sale');
const Product = require('../../models/Product');
const Delivery = require('../../models/Delivery');
const SaleItem = require('../../models/SalesItem');

const moment = require('moment-timezone'); 

router.get('/summary', async (req, res) => {
  try {
    const today = moment().tz('Asia/Singapore');
    const startOfToday = today.clone().startOf('day').toDate();
    const endOfToday = today.clone().endOf('day').toDate();
    
    const startOfMonth = today.clone().startOf('month').toDate();
    const endOfMonth = today.clone().endOf('month').toDate();

    const dailySales = await Sale.aggregate([
      {
          $match: {
              date: { 
                  $gte: startOfToday,
                  $lte: endOfToday
              }
          }
      },
      {
          $group: {
              _id: null,
              totalSales: { $sum: "$grandTotal" },
              count: { $sum: 1 }
          }
      }
  ]);

      console.log(dailySales)

      const monthlySales = await Sale.aggregate([
          {
              $match: {
                  date: { $gte: startOfMonth, $lte: endOfMonth }
              }
          },
          {
              $group: {
                  _id: null,
                  totalSales: { $sum: "$grandTotal" },
                  count: { $sum: 1 }
              }
          }
      ]);

      const deliveryStats = await Delivery.aggregate([
          {
              $match: {
                  deliveryDate: { $gte: startOfMonth, $lte: endOfMonth }
              }
          },
          {
              $group: {
                  _id: "$status",
                  count: { $sum: 1 }
              }
          }
      ]);

      // Get low stock products - Fixed Query
      const lowStockProducts = await Product.aggregate([
          {
              $match: {
                  $expr: {
                      $lte: ["$stocks", "$criticalLimit"]
                  }
              }
          },
          {
              $lookup: {
                  from: 'brands',
                  localField: 'brand',
                  foreignField: '_id',
                  as: 'brand'
              }
          },
          {
              $lookup: {
                  from: 'categories',
                  localField: 'category',
                  foreignField: '_id',
                  as: 'category'
              }
          },
          {
              $unwind: {
                  path: "$brand",
                  preserveNullAndEmptyArrays: true
              }
          },
          {
              $unwind: {
                  path: "$category",
                  preserveNullAndEmptyArrays: true
              }
          },
          {
              $limit: 10
          }
      ]);

      // Get top selling products this month
      const topProducts = await SaleItem.aggregate([
          {
              $lookup: {
                  from: 'sales',
                  localField: 'sale',
                  foreignField: '_id',
                  as: 'sale'
              }
          },
          {
              $match: {
                  'sale.date': { $gte: startOfMonth, $lte: endOfMonth }
              }
          },
          {
              $lookup: {
                  from: 'products',
                  localField: 'product',
                  foreignField: '_id',
                  as: 'product'
              }
          },
          {
              $unwind: '$product'
          },
          {
              $group: {
                  _id: '$product._id',
                  productName: { $first: '$product.name' },
                  totalQuantity: { $sum: '$quantity' },
                  totalSales: { $sum: '$subTotal' }
              }
          },
          {
              $sort: { totalQuantity: -1 }
          },
          {
              $limit: 5
          }
      ]);

      const dashboardData = {
          sales: {
              today: dailySales[0] || { totalSales: 0, count: 0 },
              monthly: monthlySales[0] || { totalSales: 0, count: 0 }
          },
          deliveries: {
              pending: deliveryStats.find(d => d._id === 'pending')?.count || 0,
              delivered: deliveryStats.find(d => d._id === 'delivered')?.count || 0
          },
          inventory: {
              lowStock: lowStockProducts
          },
          topProducts: topProducts
      };

      res.json({ success: true, data: dashboardData });
  } catch (error) {
      console.error('Dashboard Error:', error);
      res.status(500).json({ success: false, error: error.message });
  }
});
router.get('/sales-trend', async (req, res) => {
    try {
        const { period } = req.query; 
        const today = new Date();
        const startDate = new Date();
        
        switch(period) {
            case 'weekly':
                startDate.setDate(today.getDate() - 7);
                break;
            case 'monthly':
                startDate.setMonth(today.getMonth() - 1);
                break;
            default: // daily
                startDate.setDate(today.getDate() - 30);
        }

        const salesTrend = await Sale.aggregate([
            {
                $match: {
                    date: { $gte: startDate, $lte: today }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        day: { $dayOfMonth: "$date" }
                    },
                    totalSales: { $sum: "$grandTotal" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                    "_id.day": 1
                }
            }
        ]);

        res.json({ success: true, data: salesTrend });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delivery Status Statistics
router.get('/delivery-stats', async (req, res) => {
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const deliveryStats = await Delivery.aggregate([
            {
                $match: {
                    deliveryDate: { $gte: startOfMonth }
                }
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$deliveryDate" } },
                        status: "$status"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.date": 1
                }
            }
        ]);

        res.json({ success: true, data: deliveryStats });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;