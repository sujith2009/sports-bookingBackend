const express = require("express");
const {
  authenticationController,
} = require("../Controllers/authenticationController");
const router = express.Router();
router.post("/", authenticationController);
module.exports = router;
