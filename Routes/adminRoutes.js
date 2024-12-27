const express = require("express");
const {
  adminController,
  adminLoginController,
} = require("../Controllers/adminController");
const router = express.Router();
router.post("/", adminController);
router.post("/login", adminLoginController);
module.exports = router;
