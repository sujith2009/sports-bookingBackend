const popularSportsModel = require("../Models/popularSportsModel");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "_" + uniqueSuffix); // Custom filename
  },
});

// Multer middleware setup for handling single image upload
const upload = multer({ storage: storage }).single("image"); // 'image' is the field name for the file input

// Controller for handling the file upload and saving sport info to DB
exports.populsrSportsController = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer Error:", err);
      return res.status(500).json({ error: "File upload failed" });
    }
    // If no file uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      // Save sports data to the database
      const newSport = new popularSportsModel({
        sportsName: req.body.sportsName || "Unknown", // Fallback to 'Unknown' if no name provided
        sportsImage: req.file.filename, // Save the filename (stored in public/images)
      });
      const result = await newSport.save();
      res.status(201).json({ message: "File uploaded successfully", result });
    } catch (error) {
      console.error("Database Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};

//GET CONTROLLER
exports.populsrSportsGetController = async (req, res) => {
  try {
    const sports = await popularSportsModel.find();
    const sportsWithImageUrl = sports.map((sport) => ({
      ...sport.toObject(),
      imageUrl: `http://localhost:8000/images/${sport.sportsImage}`, // Construct the image URL
    }));
    return res.status(200).json(sportsWithImageUrl);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
