const express = require("express");
const router = express.Router();

const itemController = require("../../controllers/item-price.controller");

router.get("/", itemController.get).post("/", itemController.add);

router.get("/:id/product", itemController.getByProductId);

router
  .get("/:id", itemController.getById)
  .put("/:id", itemController.update)
  .delete("/:id", itemController.remove);


module.exports = router;
