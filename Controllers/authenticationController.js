const authenticationModel = require("../Models/authenticationModel");
const bcrypt = require("bcrypt");

exports.authenticationController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    // Check if email already exists
    const existingEmail = await authenticationModel.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists." });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Save new user in the database
    const newUser = new authenticationModel({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();

    // Success response
    return res
      .status(201)
      .json({ message: "Registered successfully.", newUser });
  } catch (error) {
    console.error("Error during registration:", error.message);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

// Login Controller
exports.authenticationControllerLogin = async (req, res) => {
  try {
    console.log("Login controller invoked");
    const { email, password } = req.body;
    console.log("Request Body:", req.body);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await authenticationModel.findOne({
      email: email.toLowerCase(),
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
