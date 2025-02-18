const express = require("express");
const router = express.Router();
const protect = require("../../middlewares/auth.middleware");

const itemController = require("../../controllers/delivery.controller");

router.get("/", itemController.get).post("/", itemController.add);

router
  .get("/:id", itemController.getById)
  .put("/:id", itemController.update)
  .delete("/:id", itemController.remove);

router.get("/:id/sales", itemController.getBySalesId);

module.exports = router;
