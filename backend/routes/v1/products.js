const express = require("express");
const router = express.Router();

const itemController = require("../../controllers/product.controller");

router.get("/", itemController.get).post("/", itemController.add);

router.get("/items", itemController.getItems)

router
  .get("/:id", itemController.getById)
  .put("/:id", itemController.update)
  .delete("/:id", itemController.remove);

router.get("/:id/prices", itemController.getItemPrices)


module.exports = router;
