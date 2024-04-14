const express = require("express");
const router = express.Router();

const productController = require("../../controllers/product.controller");

router.get("/", productController.get).post("/", productController.add);

router
  .get("/:id", productController.getById)
  .put("/:id", productController.update)
  .delete("/:id", productController.remove);

  module.exports = router;
