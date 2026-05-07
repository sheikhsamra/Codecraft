import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-950 text-white relative overflow-hidden flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-linear-to-br from-cyan-700/25 via-purple-700/20 to-fuchsia-700/30"></div>
      <div className="absolute top-20 right-10 w-80 h-80 bg-cyan-500/25 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-fuchsia-500/25 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
        <div className="animate-fade-up-delay bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 w-full max-w-md mx-auto order-2 lg:order-1">
          <div className="text-center mb-8">
            <div className="mx-auto w-30 h-30 flex items-center justify-center mb-5">
               <img 
                  src="/logo.png" 
                  alt="Codecraft Logo" 
                  className="h-30 w-auto"
                />
            </div>

            <h1 className="text-3xl font-black">Create Account</h1>
            <p className="text-gray-400 mt-2">
              Join Codecraft and start your journey
            </p>
          </div>

          {error && (
            <p className="bg-red-500/10 border border-red-400/30 text-red-300 p-3 mb-5 rounded-xl text-sm">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Full Name
              </label>
              <input
                className="w-full bg-white/10 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none p-4 rounded-2xl text-white placeholder:text-gray-500 transition"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Email</label>
              <input
                className="w-full bg-white/10 border border-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none p-4 rounded-2xl text-white placeholder:text-gray-500 transition"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Password
              </label>
              <input
                className="w-full bg-white/10 border border-white/10 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20 outline-none p-4 rounded-2xl text-white placeholder:text-gray-500 transition"
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              disabled={loading}
              className="mt-2 bg-linear-to-r from-cyan-500 via-purple-600 to-fuchsia-600 hover:scale-[1.02] disabled:opacity-60 text-white p-4 rounded-2xl font-bold shadow-lg shadow-cyan-500/30 transition"
            >
              {loading ? "Creating account..." : "Signup"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-300 font-bold">
              Login
            </Link>
          </p>
        </div>

        <div className="hidden lg:block animate-fade-up order-1 lg:order-2">
          <p className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-fuchsia-300 mb-5">
            Become a Creator
          </p>

          <h1 className="hero-heading text-6xl font-black leading-tight">
            Start sharing your{" "}
            <span className="animate-gradient-text text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-fuchsia-400">
              thoughts today.
            </span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-xl">
            Create your Codecraft account and get access to a secure, modern, and
            beautiful blogging experience.
          </p>

          <div className="mt-8 bg-white/10 border border-white/10 rounded-3xl p-6 max-w-lg">
            <h3 className="text-2xl font-bold">What you get?</h3>

            <div className="mt-5 space-y-4 text-gray-300">
              <p>✨ Secure JWT authentication</p>
              <p>🚀 Fast React + Vite frontend</p>
              <p>🎨 Attractive gradient blog theme</p>
              <p>🗄️ MongoDB powered user system</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;