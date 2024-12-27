const mongoose = require("mongoose");

const popularSportsSchema = new mongoose.Schema({
  sportsName: {
    type: String,
    required: true,
  },
  sportsImage: {
    type: String,
    required: true,
  },
});
const popularSportsModel = mongoose.model("popularSports", popularSportsSchema);
module.exports = popularSportsModel;
