import React from "react";
import { Link } from "react-router-dom";

function Featured() {
  const highlights = [
    {
      title: "Trending Categories",
      description: "Explore the most popular topics in our community, from Web Development to UX Design.",
      icon: "🔥",
      color: "from-orange-500 to-red-600",
      shadow: "rgba(249,115,22,0.3)",
      link: "/CategoryPage"
    },
    {
      title: "Top Creators",
      description: "Meet the most consistent and highly-rated writers sharing their knowledge on CodeCraft.",
      icon: "🏆",
      color: "from-fuchsia-600 to-purple-600",
      shadow: "rgba(192,38,211,0.3)",
      link: "/blogs"
    },
    {
      title: "Community Reach",
      description: "Over 10,000+ monthly readers and thousands of interactive discussions happening now.",
      icon: "🌎",
      color: "from-cyan-500 to-blue-600",
      shadow: "rgba(6,182,212,0.3)",
      link: "/features"
    },
    {
      title: "Developer Insights",
      description: "Deep dives into the MERN stack, cloud architecture, and modern software engineering.",
      icon: "💻",
      color: "from-blue-600 to-indigo-700",
      shadow: "rgba(37,99,235,0.3)",
      link: "/CategoryPage"
    },
    {
      title: "Interactive Learning",
      description: "Engage with authors through our real-time rating and feedback system.",
      icon: "⭐",
      color: "from-yellow-400 to-orange-500",
      shadow: "rgba(250,204,21,0.3)",
      link: "/blogs"
    },
    {
      title: "Saved Knowledge",
      description: "Users have bookmarked over 5,000 articles for future reference and continuous learning.",
      icon: "🔖",
      color: "from-green-500 to-emerald-600",
      shadow: "rgba(16,185,129,0.3)",
      link: "/saved-blogs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-950 to-cyan-950 text-white px-6 py-20 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-fade-in">
          <p className="text-fuchsia-400 font-bold uppercase tracking-[0.3em] text-sm mb-4">Spotlight</p>
          <h1 className="text-6xl md:text-7xl font-black mb-6 pb-2 leading-[1.1] tracking-tight bg-gradient-to-r from-fuchsia-400 via-white to-cyan-400 bg-clip-text text-transparent">
            Featured Highlights
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            A birds-eye view of the most impactful trends, categories, and creators shaping the future of CodeCraft.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <Link 
              to={item.link}
              key={index} 
              className="group bg-white/5 border border-white/10 rounded-[3rem] p-10 hover:bg-white/10 hover:-translate-y-3 hover:shadow-[0_20px_50px_var(--highlight-shadow)] transition-all duration-500 relative overflow-hidden flex flex-col items-center text-center"
              style={{ "--highlight-shadow": item.shadow }}
            >
              {/* Icon with Glow */}
              <div className={`w-24 h-24 rounded-[2.5rem] bg-gradient-to-br ${item.color} flex items-center justify-center text-5xl mb-8 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                {item.icon}
              </div>

              <h3 className="text-2xl font-black mb-4 group-hover:text-fuchsia-400 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                {item.description}
              </p>

              {/* Arrow Indicator */}
              <div className="mt-8 text-fuchsia-400 font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform">
                Explore More <span className="text-xl">→</span>
              </div>

              {/* Subtle background glow on hover */}
              <div className={`absolute -inset-20 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-700`}></div>
            </Link>
          ))}
        </div>

        {/* Global Stats Bar */}
        <div className="mt-24 bg-white/5 border border-white/10 rounded-[3.5rem] p-10 backdrop-blur-xl">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                 <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Total Blogs</p>
                 <h4 className="text-4xl font-black text-white">2.5k+</h4>
              </div>
              <div className="text-center border-l border-white/10">
                 <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Active Users</p>
                 <h4 className="text-4xl font-black text-white">10k+</h4>
              </div>
              <div className="text-center border-l border-white/10">
                 <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Global Reads</p>
                 <h4 className="text-4xl font-black text-white">50k+</h4>
              </div>
              <div className="text-center border-l border-white/10">
                 <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Daily Saves</p>
                 <h4 className="text-4xl font-black text-white">500+</h4>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;