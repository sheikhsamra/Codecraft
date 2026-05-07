import { useEffect , useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [search, setSearch] = useState("");

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

  const blogs = [
    {
      id: 1,
      title: "How to Start Your MERN Stack Journey",
      category: "Development",
      author: "Samra",
      description:
        "Learn the basic roadmap for becoming a MERN stack developer from scratch.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Top UI Design Tips for Modern Websites",
      category: "Design",
      author: "BlogNest Team",
      description:
        "Improve your web design with gradients, spacing, typography, and layouts.",
      image:
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Why Authentication Matters in Blog Apps",
      category: "Security",
      author: "Admin",
      description:
        "Understand JWT authentication, protected routes, and secure user login.",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "MongoDB Atlas for Beginners",
      category: "Database",
      author: "Samra",
      description:
        "A beginner-friendly guide to MongoDB Atlas, Compass, and collections.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  const filteredBlogs = blogs.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.category.toLowerCase().includes(search.toLowerCase()) ||
      blog.author.toLowerCase().includes(search.toLowerCase())
    );
  });

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
        <span key={`${headingIndex}-${wordIndex}`} className="animated-word">
          {word.split("").map((letter, letterIndex) => (
            <span
              key={`${headingIndex}-${wordIndex}-${letterIndex}`}
              className="letter text-transparent bg-clip-text bg-linear-to-b from-fuchsia-400 via-purple-400 to-cyan-400"
              style={{
                animationDelay: `${
                  (wordsBefore.length + letterIndex + wordIndex) * 0.05
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

  <span className="block mt-3 text-white text-5xl md:text-6xl ">
    in one beautiful space.
  </span>
</h1>

            <p className="animate-fade-up-delay mt-6 text-gray-300 text-lg leading-relaxed max-w-xl">
              Codecraft is an attractive blog platform where users can read,
              write, search, and manage blogs with a secure MERN stack
              authentication system.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {user ? (
                <Link
                  to="/profile"
                  className="bg-linear-to-r from-fuchsia-600 to-cyan-500 px-7 py-3 rounded-full font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
                >
                  View Profile
                </Link>
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

      {/* Search Section */}
      <section id="blogs" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <p className="text-fuchsia-400 font-semibold">Latest Blogs</p>
            <h2 className="text-4xl font-black mt-2">Explore Articles</h2>
          </div>

          <div className="w-full md:w-105">
            <input
              type="text"
              placeholder="Search blogs by title, category, or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/10 focus:border-cyan-400 outline-none px-5 py-4 rounded-2xl text-white placeholder:text-gray-400 shadow-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div id="categories" className="flex flex-wrap gap-3 mb-10">
          {["All", "Development", "Design", "Security", "Database"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSearch(cat === "All" ? "" : cat)}
                className="px-5 py-2 rounded-full bg-white/10 border border-white/10 hover:bg-linear-to-r hover:from-fuchsia-600 hover:to-cyan-500 transition"
              >
                {cat}
              </button>
            )
          )}
        </div>

        {/* Blog Cards */}
        {filteredBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="group bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-6">
                  <span className="text-sm text-cyan-300 bg-cyan-400/10 px-3 py-1 rounded-full">
                    {blog.category}
                  </span>

                  <h3 className="text-2xl font-bold mt-4 group-hover:text-fuchsia-400 transition">
                    {blog.title}
                  </h3>

                  <p className="text-gray-300 mt-3 leading-relaxed">
                    {blog.description}
                  </p>

                  <div className="mt-6 flex justify-between items-center">
                    <p className="text-sm text-gray-400">By {blog.author}</p>
                    <button className="text-fuchsia-400 font-semibold hover:text-cyan-300 transition">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/10 border border-white/10 rounded-3xl">
            <h3 className="text-2xl font-bold">No blogs found</h3>
            <p className="text-gray-400 mt-2">
              Try searching with another keyword.
            </p>
          </div>
        )}
      </section>

      {/* Featured Section */}
      <section
        id="featured"
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="bg-linear-to-r from-fuchsia-600 via-purple-600 to-cyan-500 rounded-3xl p-10 md:p-14 shadow-2xl">
          <p className="text-white/80 font-semibold">Featured</p>
          <h2 className="text-4xl font-black mt-3">
            Ready to publish your next big idea?
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl">
            Codecraft gives you a clean, modern, and secure platform to share your
            thoughts with the world.
          </p>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="max-w-7xl mx-auto px-6 pb-20"
      >
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