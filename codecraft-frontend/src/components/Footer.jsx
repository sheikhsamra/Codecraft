import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="CodeCraft Logo" className="h-16 w-16 object-contain hover:scale-110 transition-transform" />
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              Empowering creators to share stories, build communities, and craft beautiful code in one unified digital sanctuary.
            </p>
            <div className="flex gap-4">
              {['twitter', 'github', 'linkedin', 'instagram'].map((social) => (
                <a 
                  key={social} 
                  href={`#${social}`} 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-fuchsia-600 hover:to-cyan-500 hover:border-transparent transition-all group"
                >
                  <span className="text-gray-400 group-hover:text-white transition-colors uppercase text-[10px] font-bold">{social.substring(0, 2)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">Navigation</h4>
            <ul className="space-y-4">
              {[
                { label: "Home", path: "/" },
                { label: "Explore Blogs", path: "/blogs" },
                { label: "Categories", path: "/CategoryPage" },
                { label: "Featured Spotlight", path: "/featured" },
                { label: "Platform Features", path: "/features" }
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-gray-400 hover:text-white hover:translate-x-2 transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal/Support */}
          <div>
            <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Support</h4>
            <ul className="space-y-4">
              {["Privacy Policy", "Terms of Service", "Help Center", "Community Guidelines", "Contact Us"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-gray-400 hover:text-white hover:translate-x-2 transition-all inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Newsletter</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Subscribe to get the latest articles and developer updates directly in your inbox.
            </p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-fuchsia-500 transition-all text-sm pr-12"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-fuchsia-600 to-cyan-500 p-2 rounded-xl hover:scale-105 transition shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-medium">
          <p>© 2026 CodeCraft Platform. Built with ❤️ and the MERN Stack.</p>
          <div className="flex gap-8">
             <span className="cursor-pointer hover:text-white transition-colors">Local Server: Running</span>
             <span className="cursor-pointer hover:text-white transition-colors">Cloud: Connected</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;