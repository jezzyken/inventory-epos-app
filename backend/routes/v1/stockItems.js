const express = require("express");
const router = express.Router();

const itemController = require("../../controllers/stock-item.controller");

router.get("/", itemController.get).post("/", itemController.add);

router.get("/:id/product", itemController.getStockItems)

router
  .get("/:id", itemController.getById)
  .put("/:id", itemController.update)
  .delete("/:id", itemController.remove);

  module.exports = router;
