const ourSportsModel = require("../Models/ourSportsModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/ourwinnerimages"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "_" + uniqueSuffix); // Custom filename
  },
});

// Multer middleware setup for handling single image upload
const upload = multer({ storage: storage }).single("image");

//POST-CONTROLLER
exports.ourSportsController = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).join({ message: "File upload failed" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    try {
      const ourSports = new ourSportsModel({
        teamName: req.body.teamName || "Unknown", // Fallback to 'Unknown' if no name provided
        teamImage: req.file.filename, // Save the filename (stored in public/images)
        teamCity: req.body.teamCity,
      });

      const result = await ourSports.save();
      return res
        .status(201)
        .json({ message: "File uploaded successfully", result });
    } catch (error) {
      return res.status(500).join({ message: "Internal server error" });
    }
  });
};

//Get Controller
exports.ourSportsGetController = async (req, res) => {
  try {
    const sports = await ourSportsModel.find();
    const sportsWithImageUrl = sports.map((sport) => ({
      ...sport.toObject(),
      imageUrl: `http://localhost:8000/ourwinnerimages/${sport.teamImage}`, // Construct the image URL
    }));
    return res.status(200).json(sportsWithImageUrl);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
