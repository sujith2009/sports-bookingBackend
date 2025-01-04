const bookModel = require("../Models/bookModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/bookVenues"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "_" + uniqueSuffix); // Custom filename
  },
});

const upload = multer({ storage: storage }).single("image");

//POST-CONTROLLER
exports.bookController = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).join({ message: "File upload failed" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    try {
      const bookingdetails = new bookModel({
        bookSportsName: req.body.bookSportsName || "Unknown", // Fallback to 'Unknown' if no name provided
        bookVenuesImage: req.file.filename, // Save the filename (stored in public/images)
        bookDistance: req.body.bookDistance,
      });

      const result = await bookingdetails.save();
      return res
        .status(201)
        .json({ message: "File uploaded successfully", result });
    } catch (error) {
      return res.status(500).join({ message: "Internal server error" });
    }
  });
};

//Get Controller
exports.bookingGetController = async (req, res) => {
  try {
    const { id } = req.params;
    const sports = await bookModel.find(id);
    // const sports = await bookModel.find(mongoose.Types.ObjectId(id));
    if (!sports) {
      return res.status(404).json({ error: "Venue not found" });
    }
    const sportsWithImageUrl = sports.map((sport) => ({
      ...sport.toObject(),
      imageUrl: `http://localhost:8000/bookVenues/${sport.bookVenuesImage}`, // Construct the image URL
    }));
    return res.status(200).json(sportsWithImageUrl);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
