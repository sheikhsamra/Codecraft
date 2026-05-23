const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogs,
  getHomeBlogs,
  getSingleBlog,
  getMyBlogs,
  updateBlog,
  deleteBlog,
  addComment,
  rateBlog,
  likeBlog,
  saveBlog,
  getSavedBlogs,
} = require("../controllers/blogController");

const { protect } = require("../middleware/authMiddleware");
const { adminProtect } = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Public routes with category filter
// Example: GET /api/blogs?category=Development
router.get("/", getBlogs);
router.get("/home", getHomeBlogs);

// Admin route
router.get("/admin/all-blogs", protect, adminProtect, getBlogs);

// Protected routes
router.get("/user/my-blogs", protect, getMyBlogs);
router.get("/user/saved-blogs", protect, getSavedBlogs);

// Public single blog route
router.get("/:id", getSingleBlog);

// Protected routes for logged-in users
router.post("/", protect, upload.single("image"), createBlog);
router.put("/:id", protect, upload.single("image"), updateBlog);
router.delete("/:id", protect, deleteBlog);
router.post("/:id/comments", protect, addComment);
router.post("/:id/rating", protect, rateBlog);
router.post("/:id/like", protect, likeBlog);
router.post("/:id/save", protect, saveBlog);

module.exports = router;