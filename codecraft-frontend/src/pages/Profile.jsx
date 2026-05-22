import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [myBlogs, setMyBlogs] = useState([]);
  const [error, setError] = useState("");
  const [blogLoading, setBlogLoading] = useState(true);

  const token = localStorage.getItem("token");

  const getProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data.user);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch profile");
    }
  };

  const getMyBlogs = async () => {
    try {
      setBlogLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blogs/user/my-blogs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMyBlogs(res.data.blogs || []);
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setBlogLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyBlogs(myBlogs.filter((blog) => blog._id !== id));
      alert("Blog deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    getProfile();
    getMyBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-950 to-cyan-950 text-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {error && (
          <div className="bg-red-500/10 border border-red-400/30 text-red-300 p-4 rounded-2xl mb-6">
            {error}
          </div>
        )}

        {profile && (
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden mb-12">
            <div className="h-32 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500"></div>

            <div className="px-8 pb-8 -mt-14">
              <div className="w-28 h-28 rounded-3xl bg-slate-950 border-4 border-white/20 shadow-2xl flex items-center justify-center mb-6">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">
                  {profile.name?.charAt(0).toUpperCase()}
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div>
                  <h1 className="text-4xl font-black capitalize">
                    {profile.name}
                  </h1>
                  <p className="text-gray-400 mt-2">{profile.email}</p>
                </div>

                <span className="w-fit px-5 py-2 rounded-full bg-green-500/10 border border-green-400/20 text-green-300 font-semibold">
                  Active Account
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-5 mt-8">
                <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-5">
                  <p className="text-gray-400 text-sm">Role</p>
                  <h3 className="text-xl font-bold text-cyan-300 mt-2">
                    Blog Writer
                  </h3>
                </div>

                <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-5">
                  <p className="text-gray-400 text-sm">Total Blogs</p>
                  <h3 className="text-xl font-bold text-fuchsia-300 mt-2">
                    {myBlogs.length}
                  </h3>
                </div>

                <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-5">
                  <p className="text-gray-400 text-sm">Platform</p>
                  <h3 className="text-xl font-bold text-purple-300 mt-2">
                    CodeCraft
                  </h3>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/create-blog"
                  className="inline-block bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition"
                >
                  Write New Blog
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* My Blogs Section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-black">My Published Blogs</h2>
              <p className="text-gray-400 mt-2">
                Manage your blogs here. You can edit or delete only your own blogs.
              </p>
            </div>
          </div>

          {blogLoading ? (
            <div className="text-center py-20 bg-white/10 border border-white/10 rounded-3xl">
              <h3 className="text-2xl font-bold">Loading your blogs...</h3>
            </div>
          ) : myBlogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition duration-300"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-52 w-full object-cover"
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

                    <div className="mt-5 flex items-center justify-between text-sm text-gray-400">
                      <span>⭐ {blog.averageRating || 0}</span>
                      <span>💬 {blog.comments?.length || 0} Comments</span>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Link
                        to={`/edit-blog/${blog._id}`}
                        className="flex-1 text-center bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 py-2 rounded-xl hover:bg-cyan-500/20 transition"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteBlog(blog._id)}
                        className="flex-1 bg-red-500/10 border border-red-400/20 text-red-300 py-2 rounded-xl hover:bg-red-500/20 transition"
                      >
                        Delete
                      </button>
                    </div>

                    <Link
                      to={`/blogs/${blog._id}`}
                      className="block mt-4 text-center text-fuchsia-400 font-semibold hover:text-cyan-300 transition"
                    >
                      View Blog →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/10 border border-white/10 rounded-3xl">
              <h3 className="text-2xl font-bold">No blogs published yet</h3>
              <p className="text-gray-400 mt-2">
                Click on Write Blog and publish your first blog.
              </p>

              <Link
                to="/create-blog"
                className="inline-block mt-6 bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-6 py-3 rounded-full font-bold"
              >
                Write Blog
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;