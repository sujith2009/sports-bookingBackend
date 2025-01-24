const express = require("express");
const {
  booknowPostController,
  booknowGetController,
} = require("../Controllers/booknowController");

const router = express.Router();
router.post("/", booknowPostController);
router.get("/", booknowGetController);
module.exports = router;
