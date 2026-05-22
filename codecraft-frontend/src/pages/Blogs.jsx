import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
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

  useEffect(() => {
    getBlogs();
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
                className="bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">
                  <span className="text-sm text-cyan-300 bg-cyan-400/10 px-3 py-1 rounded-full">
                    {blog.category}
                  </span>

                  <h3 className="text-2xl font-bold mt-4">{blog.title}</h3>

                  <div
                    className="text-gray-300 mt-3 leading-relaxed max-h-20 overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  <div className="mt-5 flex justify-between text-sm text-gray-400">
                    <span>By {blog.author?.name || "Unknown"}</span>
                    <span>⭐ {blog.averageRating || 0}</span>
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
            <h3 className="text-2xl font-bold">No blogs found</h3>
            <p className="text-gray-400 mt-2">Try another search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;