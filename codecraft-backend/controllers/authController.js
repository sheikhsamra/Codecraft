const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

// Signup controller
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check empty fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Send response
    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio
      },
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Send response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio
      },
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Profile controller
const updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (bio) user.bio = bio;

    // Handle Image Upload
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "profiles" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });
      user.profileImage = result.secure_url;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Profile Image controller
const deleteProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profileImage = ""; // Reset to default (empty string)
    await user.save();

    res.status(200).json({
      message: "Profile image removed successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Profile controller
const getProfile = async (req, res) => {
  res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user
  });
};

module.exports = {
  signup,
  login,
  getProfile,
  updateProfile,
  deleteProfileImage
};