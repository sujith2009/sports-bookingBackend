const express = require("express");
const router = express.Router();
const {
  populsrSportsController,
  populsrSportsGetController,
} = require("../Controllers/popularSportsController");
router.post("/", populsrSportsController);
router.get("/", populsrSportsGetController);

module.exports = router;
