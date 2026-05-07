import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-950 text-white relative overflow-hidden flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-linear-to-br from-fuchsia-700/30 via-purple-700/20 to-cyan-600/30"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-fuchsia-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
        <div className="hidden lg:block animate-fade-up">
          <p className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-cyan-300 mb-5">
            Welcome Back
          </p>

          <h1 className="hero-heading text-6xl font-black leading-tight">
            Continue your{" "}
            <span className="animate-gradient-text text-transparent bg-clip-text bg-linear-to-r from-fuchsia-400 via-purple-400 to-cyan-400">
              writing journey.
            </span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-xl">
            Login to manage your profile, access protected pages, and continue
            exploring powerful stories on Codecraft.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
            <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
              <h3 className="text-2xl font-black text-fuchsia-400">JWT</h3>
              <p className="text-gray-400 text-sm mt-1">Secure login</p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
              <h3 className="text-2xl font-black text-cyan-400">MERN</h3>
              <p className="text-gray-400 text-sm mt-1">Full stack</p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
              <h3 className="text-2xl font-black text-purple-400">Blog</h3>
              <p className="text-gray-400 text-sm mt-1">Modern UI</p>
            </div>
          </div>
        </div>

        <div className="animate-fade-up-delay bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="mx-auto w-30 h-30 flex items-center justify-center mb-5">
               <img 
                  src="/logo.png" 
                  alt="Codecraft Logo" 
                  className="h-30 w-auto"
                />
            </div>

            <h1 className="text-3xl font-black">Login to Codecraft</h1>
            <p className="text-gray-400 mt-2">
              Enter your credentials to continue
            </p>
          </div>

          {error && (
            <p className="bg-red-500/10 border border-red-400/30 text-red-300 p-3 mb-5 rounded-xl text-sm">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Email</label>
              <input
                className="w-full bg-white/10 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none p-4 rounded-2xl text-white placeholder:text-gray-500 transition"
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              disabled={loading}
              className="mt-2 bg-linear-to-r from-fuchsia-600 via-purple-600 to-cyan-500 hover:scale-[1.02] disabled:opacity-60 text-white p-4 rounded-2xl font-bold shadow-lg shadow-purple-500/30 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <Link to="/Profile" className="text-cyan-300 font-bold">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;