import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { categories } from "../constants/categories";
import CategorySelector from "../components/CategorySelector";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const headings = [
    "Discover powerful stories",
    "Share creative ideas",
    "Write beautiful blogs"
  ];

  const [headingIndex, setHeadingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadingIndex((prev) => (prev + 1) % headings.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const getBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs`);
      setBlogs(res.data.blogs || []);
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

      // Update the blog in the local state
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

  const homeBlogs = filteredBlogs.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-fuchsia-700/30 via-purple-700/20 to-cyan-600/30"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-fuchsia-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-cyan-300 mb-5">
              ✨ Modern MERN Blog Platform
            </p>

            <h1 className="hero-heading text-5xl md:text-7xl font-black leading-tight tracking-tight min-h-45">
              <span className="block">
                {headings[headingIndex].split(" ").map((word, wordIndex) => {
                  const wordsBefore = headings[headingIndex]
                    .split(" ")
                    .slice(0, wordIndex)
                    .join("");

                  return (
                    <span
                      key={`${headingIndex}-${wordIndex}`}
                      className="animated-word"
                    >
                      {word.split("").map((letter, letterIndex) => (
                        <span
                          key={`${headingIndex}-${wordIndex}-${letterIndex}`}
                          className="letter text-transparent bg-clip-text bg-linear-to-b from-fuchsia-400 via-purple-400 to-cyan-400"
                          style={{
                            animationDelay: `${(wordsBefore.length + letterIndex + wordIndex) *
                              0.05
                              }s`
                          }}
                        >
                          {letter}
                        </span>
                      ))}
                    </span>
                  );
                })}
              </span>

              <span className="block mt-3 text-white text-5xl md:text-6xl">
                in one beautiful space.
              </span>
            </h1>

            <p className="animate-fade-up-delay mt-6 text-gray-300 text-lg leading-relaxed max-w-xl">
              CodeCraft is an attractive blog platform where users can read,
              write, search, and manage blogs with a secure MERN stack
              authentication system.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {user ? (
                <>
                  <Link
                    to="/create-blog"
                    className="bg-linear-to-r from-fuchsia-600 to-cyan-500 px-7 py-3 rounded-full font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
                  >
                    Write Blog
                  </Link>

                  <Link
                    to="/profile"
                    className="border border-white/20 px-7 py-3 rounded-full font-bold hover:bg-white/10 transition"
                  >
                    View Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="bg-linear-to-r from-fuchsia-600 to-cyan-500 px-7 py-3 rounded-full font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
                  >
                    Start Writing
                  </Link>

                  <Link
                    to="/login"
                    className="border border-white/20 px-7 py-3 rounded-full font-bold hover:bg-white/10 transition"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                alt="Blog writing"
                className="rounded-2xl h-80 w-full object-cover"
              />
              <div className="mt-5">
                <p className="text-cyan-300 text-sm">Featured Article</p>
                <h3 className="text-2xl font-bold mt-2">
                  Build your voice through powerful writing.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <p className="text-fuchsia-400 font-semibold uppercase tracking-widest text-sm mb-3">Explore Content</p>
          <h2 className="text-5xl font-black mb-10">Latest Articles</h2>

          <div className="max-w-3xl mx-auto mb-10">
            <input
              type="text"
              placeholder="Search blogs by title, category, or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/10 focus:border-cyan-400 outline-none px-6 py-5 rounded-[2rem] text-white placeholder:text-gray-400 shadow-2xl backdrop-blur-md transition-all"
            />
          </div>

          <div className="flex justify-center">
            <CategorySelector categories={categories} onSelect={setSearch} />
          </div>
        </div>

        {/* Blog Cards */}
        {loading ? (
          <div className="text-center py-20 bg-white/10 border border-white/10 rounded-3xl">
            <h3 className="text-2xl font-bold">Loading blogs...</h3>
            <p className="text-gray-400 mt-2">
              Please wait while blogs are loading from MongoDB.
            </p>
          </div>
        ) : homeBlogs.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {homeBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="group bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-3 hover:bg-white/15 hover:shadow-[0_20px_50px_rgba(192,38,211,0.15)] transition-all duration-500"
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

                    <h3 className="text-2xl font-bold mt-4 group-hover:text-fuchsia-400 transition-colors duration-300">
                      {blog.title}
                    </h3>

                    <div
                      className="text-gray-300 mt-3 leading-relaxed max-h-20 overflow-hidden group-hover:text-white transition-colors duration-300"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    <div className="mt-6 flex justify-between items-center">
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">By {blog.author?.name || "Unknown"}</p>
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
                                  className={`w-6 h-6 transition-all duration-300 ${user && blog.likes?.includes(user.id) ? "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" : "text-gray-400 group-hover/like:text-red-400 group-hover/like:drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]"}`}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                                <span className={`text-sm transition-all duration-300 ${user && blog.likes?.includes(user.id) ? "text-red-500" : "text-gray-400 group-hover/like:text-red-400"}`}>{blog.likes?.length || 0}</span>
                                </button>

                                <div className="flex items-center gap-1.5 hover:scale-125 transition-all duration-300 cursor-default group/stat">
                                <span className="group-hover/stat:text-yellow-400 group-hover/stat:drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] transition-all">⭐</span>
                                <span className="text-sm group-hover/stat:text-gray-200 transition-colors">{blog.averageRating || 0}</span>
                                </div>

                                <div className="flex items-center gap-1.5 hover:scale-125 transition-all duration-300 cursor-default group/stat">
                                <span className="group-hover/stat:text-cyan-400 group-hover/stat:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all">👁️</span>
                                <span className="text-sm group-hover/stat:text-gray-200 transition-colors">{blog.views || 0}</span>
                                </div>                          </div>
                    </div>

                    <Link
                      to={`/blogs/${blog._id}`}
                      className="block mt-6 text-center border border-fuchsia-500/30 text-fuchsia-400 py-3 rounded-xl font-bold hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-cyan-500 hover:text-white hover:border-transparent hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/blogs"
                className="inline-block bg-linear-to-r from-fuchsia-600 to-cyan-500 px-8 py-3 rounded-full font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
              >
                See More Blogs
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-white/10 border border-white/10 rounded-3xl">
            <h3 className="text-2xl font-bold">No blogs found</h3>
            <p className="text-gray-400 mt-2">
              Publish your first blog from Write Blog.
            </p>
          </div>
        )}
      </section>

      {/* Featured Section */}
      <section id="featured" className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-linear-to-r from-fuchsia-600 via-purple-600 to-cyan-500 rounded-3xl p-10 md:p-14 shadow-2xl">
          <p className="text-white/80 font-semibold">Featured</p>
          <h2 className="text-4xl font-black mt-3">
            Ready to publish your next big idea?
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl">
            CodeCraft gives you a clean, modern, and secure platform to share
            your thoughts with the world.
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 border border-white/10 p-7 rounded-3xl">
            <h3 className="text-xl font-bold text-fuchsia-400">Secure Auth</h3>
            <p className="text-gray-300 mt-3">
              JWT based login, signup, and protected profile route.
            </p>
          </div>

          <div className="bg-white/10 border border-white/10 p-7 rounded-3xl">
            <h3 className="text-xl font-bold text-cyan-400">Modern UI</h3>
            <p className="text-gray-300 mt-3">
              Attractive gradient theme, cards, search bar, and responsive
              layout.
            </p>
          </div>

          <div className="bg-white/10 border border-white/10 p-7 rounded-3xl">
            <h3 className="text-xl font-bold text-purple-400">MERN Stack</h3>
            <p className="text-gray-300 mt-3">
              React, Tailwind CSS, Express, Node.js, and MongoDB.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;