import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const getBlog = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}`
      );
      setBlog(res.data.blog);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch blog");
    }
  };

  useEffect(() => {
    getBlog();
  }, [id]);

  const submitComment = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("Please login first to comment");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}/comments`,
        { text: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlog(res.data.blog);
      setComment("");
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Comment failed");
    }
  };

  const submitRating = async (value) => {
    if (!token) {
      setError("Please login first to rate this blog");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}/rating`,
        { value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlog(res.data.blog);
      setRating(value);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Rating failed");
    }
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        {error || "Loading blog..."}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-950 to-cyan-950 text-white px-4 py-14">
      <div className="max-w-4xl mx-auto">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[420px] object-cover rounded-3xl border border-white/10 shadow-2xl"
        />

        <div className="mt-8">
          <span className="text-sm text-cyan-300 bg-cyan-400/10 px-3 py-1 rounded-full">
            {blog.category}
          </span>

          <h1 className="text-5xl font-black mt-5">{blog.title}</h1>

          <div className="flex flex-wrap gap-4 text-gray-400 mt-4">
            <span>By {blog.author?.name || "Unknown"}</span>
            <span>⭐ Average Rating: {blog.averageRating || 0}</span>
            <span>💬 {blog.comments?.length || 0} Comments</span>
          </div>

          <div
            className="prose prose-invert max-w-none text-gray-200 mt-10 leading-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Rating */}
        <div className="mt-12 bg-white/10 border border-white/10 rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-4">Rate this blog</h2>

          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => submitRating(star)}
                className={`text-3xl ${
                  star <= rating ? "text-yellow-300" : "text-gray-500"
                } hover:text-yellow-300 transition`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="mt-8 bg-white/10 border border-white/10 rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-4">Leave a comment</h2>

          {error && (
            <p className="bg-red-500/10 border border-red-400/30 text-red-300 p-3 rounded-xl mb-4">
              {error}
            </p>
          )}

          <form onSubmit={submitComment} className="flex flex-col gap-4">
            <textarea
              rows="4"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-white/10 border border-white/10 p-4 rounded-2xl outline-none focus:border-cyan-400 text-white placeholder:text-gray-400"
            />

            <button className="bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white py-3 rounded-xl font-bold">
              Post Comment
            </button>
          </form>
        </div>

        {/* Comments List */}
        <div className="mt-8">
          <h2 className="text-3xl font-black mb-5">Comments</h2>

          {blog.comments?.length > 0 ? (
            <div className="space-y-4">
              {blog.comments.map((item) => (
                <div
                  key={item._id}
                  className="bg-white/10 border border-white/10 rounded-2xl p-5"
                >
                  <p className="font-bold text-cyan-300">
                    {item.user?.name || "User"}
                  </p>
                  <p className="text-gray-300 mt-2">{item.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;