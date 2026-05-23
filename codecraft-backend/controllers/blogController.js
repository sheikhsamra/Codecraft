const Blog = require("../models/Blog");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

// CREATE BLOG
const createBlog = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    if (!title || !category || !content) {
      return res.status(400).json({ message: "Title, category and content are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Blog image is required" });
    }

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const uploadResult = await cloudinary.uploader.upload(base64Image, { folder: "codecraft-blogs" });

    const blog = await Blog.create({
      title,
      category,
      content,
      image: uploadResult.secure_url,
      author: req.user._id,
      views: 0,
      likes: []
    });

    res.status(201).json({ message: "Blog published successfully", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE BLOG (increment view count)
const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email")
      .populate("comments.user", "name email")
      .populate("ratings.user", "name email")
      .populate("likes", "name email");

    if (!blog) return res.status(404).json({ message: "Blog not found" });

     // ✅ Place unique view increment here
    if (req.user) {
      if (!blog.uniqueViews.includes(req.user._id)) {
        blog.uniqueViews.push(req.user._id);
        blog.views = blog.uniqueViews.length;
        await blog.save();
      }
    } else {
      // For guests, just increment the simple view counter
      blog.views = (blog.views || 0) + 1;
      await blog.save();
    }

    res.status(200).json({ message: "Blog fetched successfully", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
};

// LIKE / UNLIKE BLOG
const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const userId = req.user._id.toString();
    const likedIndex = blog.likes.findIndex(u => u.toString() === userId);

    if (likedIndex > -1) blog.likes.splice(likedIndex, 1); // unlike
    else blog.likes.push(req.user._id); // like

    await blog.save();
    const updatedBlog = await Blog.findById(req.params.id).populate("author", "name email").populate("likes", "name email");
    res.status(200).json({ message: "Blog like toggled", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SAVE / UNSAVE BLOG
const saveBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const user = await User.findById(req.user._id);

    const savedIndex = user.savedBlogs.indexOf(blogId);
    if (savedIndex > -1) {
      user.savedBlogs.splice(savedIndex, 1); // Unsave
    } else {
      user.savedBlogs.push(blogId); // Save
    }

    await user.save();
    res.status(200).json({ 
      message: savedIndex > -1 ? "Blog removed from favorites" : "Blog saved to favorites", 
      savedBlogs: user.savedBlogs 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SAVED BLOGS
const getSavedBlogs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "savedBlogs",
      populate: { path: "author", select: "name email" }
    });
    
    res.status(200).json({ message: "Saved blogs fetched", blogs: user.savedBlogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BLOGS
const getBlogs = async (req, res) => {
  try {
    const filter = req.query.category && req.query.category !== "" ? { category: req.query.category } : {};
    const blogs = await Blog.find(filter)
      .populate("author", "name email")
      .populate("comments.user", "name email")
      .populate("ratings.user", "name email")
      .populate("likes", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({ message: "Blogs fetched successfully", blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET HOME BLOGS: rating > 3, limit 6
const getHomeBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ averageRating: { $gt: 3 } })
      .populate("author", "name email")
      .sort({ averageRating: -1, createdAt: -1 })
      .limit(6);
    res.status(200).json({ message: "Home blogs fetched successfully", blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET LOGGED-IN USER BLOGS
const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id })
      .populate("author", "name email")
      .populate("likes", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({ message: "My blogs fetched successfully", blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE BLOG
const updateBlog = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: "You can update only your own blog" });

    blog.title = title || blog.title;
    blog.category = category || blog.category;
    blog.content = content || blog.content;

    if (req.file) {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const uploadResult = await cloudinary.uploader.upload(base64Image, { folder: "codecraft-blogs" });
      blog.image = uploadResult.secure_url;
    }

    await blog.save();
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE BLOG
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: "You can delete only your own blog" });

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD COMMENT
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Comment text is required" });

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.comments.push({ user: req.user._id, text });
    await blog.save();

    const updatedBlog = await Blog.findById(req.params.id)
      .populate("author", "name email")
      .populate("comments.user", "name email")
      .populate("ratings.user", "name email")
      .populate("likes", "name email");

    res.status(201).json({ message: "Comment added successfully", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RATE BLOG
const rateBlog = async (req, res) => {
  try {
    const { value } = req.body;
    if (!value || value < 1 || value > 5) return res.status(400).json({ message: "Rating must be between 1-5" });

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const existingRating = blog.ratings.find(r => r.user.toString() === req.user._id.toString());
    if (existingRating) existingRating.value = value;
    else blog.ratings.push({ user: req.user._id, value });

    blog.averageRating = blog.ratings.reduce((sum, r) => sum + r.value, 0) / blog.ratings.length;
    await blog.save();

    const updatedBlog = await Blog.findById(req.params.id)
      .populate("author", "name email")
      .populate("comments.user", "name email")
      .populate("ratings.user", "name email")
      .populate("likes", "name email");

    res.status(200).json({ message: "Rating submitted successfully", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
  getSavedBlogs
};