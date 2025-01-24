const mongoose = require("mongoose");
const booknowSchema = new mongoose.Schema({
  sportsName: {
    type: String,
    required: true,
  },
  sportsDate: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  teamLeaderName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  teamEmail: {
    type: String,
    required: true,
  },
});
const booknowModel = mongoose.model("Booknow", booknowSchema);
module.exports = booknowModel;
