const adminModel = require("../Models/adminModel");
const bcrypt = require("bcrypt");
//POST CONTROLLER
exports.adminController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All field Reuired" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    //Existing Email
    const existingEmail = await adminModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email Already Exists" });
    }

    //Hash-password
    const hashPassword = await bcrypt.hash(password, 6);

    //Models-Fiels-save
    const newUser = await adminModel({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "Register Successfully", newUser });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.adminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All field quired" });
    }
    const user = await adminModel.findOne({
      email: email.toLowerCase(),
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    return res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};
