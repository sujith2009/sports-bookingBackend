const express = require("express");
const router = express.Router();
const {
  ourSportsController,
  ourSportsGetController,
} = require("../Controllers/oursportsController");
router.post("/", ourSportsController);
router.get("/", ourSportsGetController);

module.exports = router;
