const express = require("express");
const { adminController } = require("../Controllers/adminController");
const router = express.Router();
router.post("/", adminController);
module.exports = router;
