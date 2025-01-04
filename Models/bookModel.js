const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  bookSportsName: {
    required: true,
    type: String,
  },
  bookVenuesImage: {
    required: true,
    type: String,
  },
  bookDistance: {
    required: true,
    type: String,
  },
});

const bookController = mongoose.model("bookingVenues", bookSchema);
module.exports = bookController;
