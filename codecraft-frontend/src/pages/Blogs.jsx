import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Blogs() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [blogs, setBlogs] = useState([]);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs`);
      setBlogs(res.data.blogs);
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const getSavedBlogs = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs/user/saved-blogs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSavedBlogs(res.data.blogs.map(b => b._id));
    } catch (error) {
      console.log("Failed to fetch saved blogs");
    }
  };

  const handleLike = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to like this blog!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setBlogs((prev) =>
        prev.map((blog) => (blog._id === id ? res.data.blog : blog))
      );
    } catch (error) {
      console.log(error.response?.data?.message || "Like failed");
    }
  };

  const handleSave = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to save this blog!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}/save`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setSavedBlogs(res.data.savedBlogs);
    } catch (error) {
        console.log("Save failed");
    }
  };

  useEffect(() => {
    getBlogs();
    getSavedBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    return (
      blog.title?.toLowerCase().includes(search.toLowerCase()) ||
      blog.category?.toLowerCase().includes(search.toLowerCase()) ||
      blog.author?.name?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-950 to-cyan-950 text-white px-4 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black">All Blogs</h1>
          <p className="text-gray-400 mt-3">
            Read blogs published by CodeCraft users.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search blogs by title, category, or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/10 border border-white/10 p-4 rounded-2xl outline-none focus:border-cyan-400 text-white placeholder:text-gray-400"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-300">Loading blogs...</p>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="group bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-3 hover:bg-white/15 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] transition-all duration-500"
              >
                <div className="overflow-hidden">
                    <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-cyan-300 bg-cyan-400/10 px-3 py-1 rounded-full group-hover:bg-cyan-400/20 transition-colors">
                      {blog.category}
                    </span>
                    <button 
                        onClick={() => handleSave(blog._id)}
                        className={`transition-all duration-300 hover:scale-125 ${savedBlogs.includes(blog._id) ? "text-cyan-400" : "text-gray-400 hover:text-cyan-300"}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={savedBlogs.includes(blog._id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                      </button>
                  </div>

                  <h3 className="text-2xl font-bold mt-4 group-hover:text-fuchsia-400 transition-colors duration-300">{blog.title}</h3>

                  <div
                    className="text-gray-300 mt-3 leading-relaxed max-h-20 overflow-hidden group-hover:text-white transition-colors duration-300"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  <div className="mt-5 flex justify-between items-center text-sm text-gray-400">
                    <span className="group-hover:text-gray-300 transition-colors">By {blog.author?.name || "Unknown"}</span>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => handleLike(blog._id)}
                            className="flex items-center gap-1.5 hover:scale-125 transition-all duration-300 group/like"
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              fill={user && blog.likes?.includes(user.id) ? "currentColor" : "none"} 
                              viewBox="0 0 24 24" 
                              strokeWidth={1.5} 
                              stroke="currentColor" 
                              className={`w-5 h-5 transition-all duration-300 ${user && blog.likes?.includes(user.id) ? "text-red-500" : "text-gray-400 group-hover/like:text-red-400"}`}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            <span className={`transition-all duration-300 ${user && blog.likes?.includes(user.id) ? "text-red-500" : "text-gray-400 group-hover/like:text-red-400"}`}>{blog.likes?.length || 0}</span>
                          </button>
                        <div className="flex items-center gap-1.5 hover:scale-125 transition-all duration-300 cursor-default group/stat">
                            <span className="group-hover/stat:text-yellow-400 group-hover/stat:drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] transition-all">⭐</span>
                            <span className="group-hover/stat:text-gray-200 transition-colors">{blog.averageRating || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5 hover:scale-125 transition-all duration-300 cursor-default group/stat">
                            <span className="group-hover/stat:text-cyan-400 group-hover/stat:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all">👁️</span>
                            <span className="group-hover/stat:text-gray-200 transition-colors">{blog.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5 hover:scale-125 transition-all duration-300 cursor-default group/stat">
                            <span className="group-hover/stat:text-purple-400 group-hover/stat:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] transition-all">💬</span>
                            <span className="group-hover/stat:text-gray-200 transition-colors">{blog.comments?.length || 0}</span>
                        </div>
                    </div>
                  </div>

                  <Link
                    to={`/blogs/${blog._id}`}
                    className="block mt-6 text-center border border-cyan-500/30 text-cyan-400 py-3 rounded-xl font-bold hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-cyan-500 hover:text-white hover:border-transparent hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Read Blog
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white/10 border border-white/10 rounded-3xl py-20">
            <h3 className="text-2xl font-bold">No blogs found</h3>
            <p className="text-gray-400 mt-2">Try another search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;