const mongoose = require("mongoose");
const ourSportsSchema = new mongoose.Schema({
  teamImage: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  teamCity: {
    type: String,
    required: true,
  },
});

const ourSportsModel = mongoose.model("ourSportsImage", ourSportsSchema);
module.exports = ourSportsModel;
