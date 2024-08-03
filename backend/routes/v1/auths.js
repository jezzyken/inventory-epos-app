const express = require("express");
const router = express.Router();
const protect = require("../../middlewares/auth.middleware");

const itemController = require("../../controllers/auth.controller");

router.post("/register", itemController.create);
router.post("/login", itemController.login);

router.get("/protected", protect, (req, res) => {
  res.send("This is a protected route");
});

module.exports = router;
