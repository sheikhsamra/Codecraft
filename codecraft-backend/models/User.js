const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    savedBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
      }
    ],

    profileImage: {
      type: String,
      default: ""
    },

    bio: {
      type: String,
      default: "Hey there! I am using CodeCraft."
    },

    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);