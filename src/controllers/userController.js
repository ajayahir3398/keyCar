const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    street1,
    street2,
    address,
    city,
    zipCode,
    gstNumber,
    password,
  } = req.body;

  // Validate input
  if (
    !firstName ||
    !lastName ||
    !phoneNumber ||
    !email ||
    !street1 ||
    !city ||
    !zipCode ||
    !password
  ) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      address: {
        street1,
        street2,
        address,
        city,
        zipCode,
      },
      gstNumber,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
