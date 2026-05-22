import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const getMyBlogs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blogs/user/my-blogs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogs(res.data.blogs);
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    getMyBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-950 to-cyan-950 text-white px-4 py-14">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black">My Blogs</h1>
        <p className="text-gray-400 mt-3 mb-10">
          Manage your published blogs.
        </p>

        {loading ? (
          <p>Loading...</p>
        ) : blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white/10 border border-white/10 rounded-3xl overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-6">
                  <span className="text-sm text-cyan-300">
                    {blog.category}
                  </span>

                  <h3 className="text-2xl font-bold mt-3">{blog.title}</h3>

                  <div className="flex justify-between mt-5 text-sm text-gray-400">
                    <span>⭐ {blog.averageRating || 0}</span>
                    <span>💬 {blog.comments?.length || 0}</span>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Link
                      to={`/edit-blog/${blog._id}`}
                      className="flex-1 text-center bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 py-2 rounded-xl"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="flex-1 bg-red-500/10 border border-red-400/20 text-red-300 py-2 rounded-xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/10 border border-white/10 rounded-3xl py-20 text-center">
            <h2 className="text-2xl font-bold">No blogs yet</h2>
            <p className="text-gray-400 mt-2">Publish your first blog.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;