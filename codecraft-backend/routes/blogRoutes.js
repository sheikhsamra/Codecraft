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
} = require("../controllers/blogController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Public routes
router.get("/", getBlogs);
router.get("/home", getHomeBlogs);

// Protected route for logged-in user's blogs
router.get("/user/my-blogs", protect, getMyBlogs);

// Public single blog route
router.get("/:id", getSingleBlog);

// Protected routes
router.post("/", protect, upload.single("image"), createBlog);
router.put("/:id", protect, upload.single("image"), updateBlog);
router.delete("/:id", protect, deleteBlog);
router.post("/:id/comments", protect, addComment);
router.post("/:id/rating", protect, rateBlog);

module.exports = router;