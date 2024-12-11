const mongoose = require("mongoose");
const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});
const authModel = mongoose.model("authencation", authSchema);
module.exports = authModel;
