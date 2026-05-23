import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SavedBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const getSavedBlogs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blogs/user/saved-blogs`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setBlogs(res.data.blogs || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch saved blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}/save`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
        console.log("Unsave failed", error);
    }
  };

  useEffect(() => {
    getSavedBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-950 to-cyan-950 text-white px-4 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black">Your Bookmarks</h1>
          <p className="text-gray-400 mt-3">
            Blogs you've saved to read later.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-300">Loading your favorites...</p>
        ) : blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-cyan-300 bg-cyan-400/10 px-3 py-1 rounded-full">
                        {blog.category}
                    </span>
                    <button 
                        onClick={() => handleUnsave(blog._id)}
                        className="text-red-400 hover:text-red-300 transition"
                        title="Remove from bookmarks"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                        </svg>
                    </button>
                  </div>

                  <h3 className="text-2xl font-bold mt-4">{blog.title}</h3>

                  <div
                    className="text-gray-300 mt-3 leading-relaxed max-h-20 overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  <div className="mt-5 flex justify-between items-center text-sm text-gray-400">
                    <span>By {blog.author?.name || "Unknown"}</span>
                    <span>👁️ {blog.views || 0} | ❤️ {blog.likes?.length || 0}</span>
                  </div>

                  <Link
                    to={`/blogs/${blog._id}`}
                    className="block mt-6 text-center bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white py-3 rounded-xl font-bold hover:scale-[1.02] transition"
                  >
                    Read Blog
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white/10 border border-white/10 rounded-3xl py-20">
            <h3 className="text-2xl font-bold">No saved blogs yet</h3>
            <p className="text-gray-400 mt-2">Explore blogs and save your favorites!</p>
            <Link to="/blogs" className="inline-block mt-6 text-fuchsia-400 font-bold hover:underline">Browse Blogs</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedBlogs;