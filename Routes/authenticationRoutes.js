const express = require("express");
const {
  authenticationController,
  authenticationControllerLogin,
} = require("../Controllers/authenticationController");

const router = express.Router();
//signup
router.post("/", authenticationController);

//login
router.post("/login", authenticationControllerLogin);
module.exports = router;
