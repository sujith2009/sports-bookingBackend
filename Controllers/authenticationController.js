const authenticationModel = require("../Models/authenticationModel");
const bcrypt = require("bcrypt");
exports.authenticationController = async (req, res) => {
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
    const existingEmail = await authenticationModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email Already Exists" });
    }

    //Hash-password
    const hashPassword = await bcrypt.hash(password, 6);

    //Models-Fiels-save
    const newUser = await authenticationModel({
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
