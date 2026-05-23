import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-fuchsia-700/30 via-purple-700/20 to-cyan-600/30 px-6 py-24">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 animate-text-fade animate-fade-up">
            Welcome to CodeCraft
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-fade-up">
            A modern MERN stack blogging platform where you can write, share, comment, rate, and explore blogs in one beautiful space.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-up delay-200">
            <Link
              to="/create-blog"
              className="bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition"
            >
              Start Writing
            </Link>
            <Link
              to="/blogs"
              className="border border-white/20 px-6 py-3 rounded-full font-bold hover:bg-white/10 transition"
            >
              Browse Blogs
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div className="animate-fade-up delay-100">
          <h2 className="text-4xl font-black text-fuchsia-400 mb-4">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Empower users to share knowledge and ideas, build a community-driven platform, and provide a secure and beautiful blogging experience.
          </p>
        </div>
        <div className="animate-fade-up delay-200">
          <h2 className="text-4xl font-black text-cyan-400 mb-4">Our Vision</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            A modern, responsive, and attractive platform where creativity meets simplicity. Everyone can publish and explore content seamlessly.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-black text-center text-purple-400 mb-12 animate-fade-up">
          Key Blogging Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Secure Authentication", desc: "JWT-based login/signup for protected routes.", color: "fuchsia" },
            { title: "Rich Text Editor", desc: "Bold, Italic, Highlight, and image uploads.", color: "cyan" },
            { title: "Comment & Rating", desc: "Interact with blogs by commenting and rating.", color: "purple" },
            { title: "Search & Categories", desc: "Filter blogs by title, author, category.", color: "fuchsia" },
            { title: "Responsive Design", desc: "Mobile-first, gradient themed UI.", color: "cyan" },
            { title: "MERN Stack Powered", desc: "React, Tailwind, Node.js, Express, MongoDB.", color: "purple" },
          ].map((feature, idx) => (
            <div
              key={idx}
              className={`bg-white/10 border border-white/10 rounded-3xl p-6 hover:scale-105 transition duration-500 shadow-lg animate-fade-up delay-${idx * 100}`}
            >
              <h3 className={`text-xl font-bold text-${feature.color}-400 mb-2`}>{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-black text-center text-fuchsia-400 mb-12 animate-fade-up">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-8 text-center">
          {[
            { name: "React", color: "cyan-400" },
            { name: "Tailwind CSS", color: "fuchsia-400" },
            { name: "Node.js", color: "green-400" },
            { name: "Express.js", color: "purple-400" },
            { name: "MongoDB", color: "green-300" },
          ].map((tech, idx) => (
            <div
              key={idx}
              className="bg-white/10 border border-white/10 p-6 rounded-2xl shadow-lg w-36 hover:scale-105 transition animate-fade-up delay-[${idx * 100}ms]"
            >
              <h3 className={`font-bold text-${tech.color} text-xl mb-2`}>{tech.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Developer / About Me Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 bg-linear-to-br from-fuchsia-700/30 via-purple-700/20 to-cyan-600/30 rounded-3xl shadow-2xl ">
        <h2 className="text-4xl font-black text-white text-center mb-12 ">About Me</h2>
        <div className="md:flex md:items-center md:justify-between gap-10">
          <div className="flex-shrink-0 text-center md:text-left animate-fade-up delay-300">
            <img
              src="/logo.png"
              alt="Developer"
              className="w-48 h-48 rounded-3xl mb-6 mx-auto md:mx-0 object-cover shadow-2xl border border-white/10"
            />
          </div>
          <div className="text-center md:text-left text-gray-300 space-y-4 animate-fade-up delay-200">
            <h3 className="text-2xl font-bold">Samra Monuddin</h3>
            <p>
              Hi! I am the developer of CodeCraft, a modern blogging platform built with MERN stack. My goal is to provide a secure, beautiful, and feature-rich blogging experience.
            </p>
            <p>
              This project uses MongoDB Atlas + Compass for data storage, Node.js + Express.js for backend API, and React + Tailwind for frontend. Users can write, edit, comment, rate, and search blogs seamlessly.
            </p>
            <p>
              Suggestions & feedback are welcome! If you have ideas for new features or improvements, feel free to connect or comment.
            </p>
            <div className="mt-6 flex justify-center md:justify-start gap-4">
              <a
                href="https://www.linkedin.com/in/samra-monuddin/"
                target="_blank"
                className="bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                className="bg-white/10 border border-white/20 px-6 py-2 rounded-full font-bold hover:bg-white/20 transition"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;