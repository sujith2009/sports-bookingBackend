const express = require("express");
const {
  bookController,
  bookingGetController,
} = require("../Controllers/bookController");
const router = express.Router();
router.post("/", bookController);
// router.get("/", bookingGetController);
router.get("/", bookingGetController);

module.exports = router;
