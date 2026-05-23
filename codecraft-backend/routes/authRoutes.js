const express = require("express");
const router = express.Router();

const { signup, login, getProfile, updateProfile, deleteProfileImage } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, upload.single("image"), updateProfile);
router.delete("/profile/image", protect, deleteProfileImage);

module.exports = router;