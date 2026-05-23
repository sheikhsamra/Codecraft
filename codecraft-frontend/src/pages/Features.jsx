import React from "react";
import { Link } from "react-router-dom";

const Features = () => {
  const featureList = [
    {
      title: "Interactive Blog Dashboard",
      description: "Manage your published and saved blogs with a sleek, tabbed interface. Real-time stats at your fingertips.",
      icon: "📊",
      color: "from-fuchsia-600 to-purple-600",
      shadow: "rgba(192,38,211,0.3)"
    },
    {
      title: "Secure Authentication",
      description: "Your data is protected with JWT-based authentication and secure password hashing. Privacy first.",
      icon: "🔐",
      color: "from-cyan-600 to-blue-600",
      shadow: "rgba(6,182,212,0.3)"
    },
    {
      title: "Rich Text Editor",
      description: "Write beautiful stories with our custom rich text editor. Bold, italic, and highlight with ease.",
      icon: "✍️",
      color: "from-yellow-500 to-orange-500",
      shadow: "rgba(250,204,21,0.3)"
    },
    {
      title: "Cloud Media Storage",
      description: "Integrated with Cloudinary for seamless and reliable image uploads for your blogs and profile.",
      icon: "☁️",
      color: "from-blue-600 to-indigo-600",
      shadow: "rgba(59,130,246,0.3)"
    },
    {
      title: "Real-time Engagement",
      description: "Interact with the community through likes, comments, and ratings. Watch your reach grow live.",
      icon: "🚀",
      color: "from-red-600 to-rose-600",
      shadow: "rgba(239,68,68,0.3)"
    },
    {
      title: "Dynamic Personalization",
      description: "Customize your profile with a bio and image. Fallback initials ensure you always look good.",
      icon: "🎨",
      color: "from-green-500 to-emerald-600",
      shadow: "rgba(16,185,129,0.3)"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-950 to-cyan-950 text-white px-6 py-20 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4">Core Capabilities</p>
          <h1 className="text-6xl font-black mb-6 tracking-tight bg-gradient-to-r from-fuchsia-400 via-white to-cyan-400 bg-clip-text text-transparent">
            Platform Features
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Discover the powerful tools and interactive experiences that make CodeCraft the ultimate space for writers and readers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 hover:-translate-y-3 hover:shadow-[0_20px_50px_var(--feature-shadow)] transition-all duration-500 relative overflow-hidden"
              style={{ "--feature-shadow": feature.shadow }}
            >
              {/* Feature Icon with Glow */}
              <div className={`w-20 h-20 rounded-[2rem] bg-gradient-to-br ${feature.color} flex items-center justify-center text-4xl mb-8 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                {feature.icon}
              </div>

              <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                {feature.description}
              </p>

              {/* Decorative Accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
           <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/10 via-transparent to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <h2 className="text-4xl font-black mb-6">Ready to experience these features?</h2>
              <div className="flex flex-wrap justify-center gap-6">
                <Link 
                  to="/signup" 
                  className="px-10 py-4 bg-gradient-to-r from-fuchsia-600 to-cyan-500 rounded-full font-black hover:scale-105 transition shadow-2xl shadow-purple-500/20"
                >
                  Join CodeCraft Today
                </Link>
                <Link 
                  to="/blogs" 
                  className="px-10 py-4 bg-white/5 border border-white/10 rounded-full font-black hover:bg-white/10 transition"
                >
                  Explore Blogs
                </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Features;