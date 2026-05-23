import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      setDarkMode(false);
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    } else {
      setDarkMode(true);
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setIsOpen(false);
  };

  const navTextColor = darkMode ? "text-gray-300" : "text-gray-700";
  const navBg = darkMode
    ? "bg-slate-950/90 border-white/10"
    : "bg-white/90 border-gray-200 shadow-sm";

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="CodeCraft Logo"
            className="h-20 w-20 object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div
          className={`hidden md:flex items-center gap-7 text-sm md:text-[16px] font-medium ${navTextColor}`}
        >
          <Link to="/" className="hover:text-fuchsia-500 transition">
            Home
          </Link>

          <Link to="/blogs" className="hover:text-fuchsia-500 transition">
            Blogs
          </Link>

          <Link to="/CategoryPage" className="hover:text-fuchsia-500 transition">
            Categories
          </Link>

          <Link to="/featured" className="hover:text-fuchsia-500 transition">
            Featured
          </Link>

          <Link to="/about" className="hover:text-fuchsia-500 transition">
            About
          </Link>

          <Link to="/features" className="hover:text-cyan-500 transition">
            Features
          </Link>
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/create-blog"
                className={`font-semibold transition ${
                  darkMode
                    ? "text-gray-300 hover:text-fuchsia-400"
                    : "text-gray-700 hover:text-fuchsia-600"
                }`}
              >
                Write Blog
              </Link>

              <Link
                to="/profile"
                className={`font-semibold transition ${
                  darkMode
                    ? "text-gray-300 hover:text-cyan-400"
                    : "text-gray-700 hover:text-fuchsia-600"
                }`}
              >
                Hi, {user.name}
              </Link>

              <button
                onClick={logout}
                className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white px-5 py-2 rounded-full shadow-lg shadow-fuchsia-500/20 transition"
              >
                Logout
              </button>

              <button
                onClick={toggleTheme}
                className={`h-11 w-20 rounded-full border flex items-center px-1 transition-all duration-300 ${
                  darkMode
                    ? "bg-slate-800 border-white/10 justify-end"
                    : "bg-gray-100 border-gray-300 justify-start"
                }`}
                title="Change theme"
              >
                <span
                  className={`h-9 w-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                    darkMode
                      ? "bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white"
                      : "bg-white text-slate-900"
                  }`}
                >
                  {darkMode ? "🌙" : "☀️"}
                </span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`font-semibold transition ${
                  darkMode
                    ? "text-gray-300 hover:text-cyan-400"
                    : "text-gray-700 hover:text-fuchsia-600"
                }`}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 hover:scale-105 text-white px-5 py-2 rounded-full shadow-lg shadow-purple-500/30 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Right */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`h-10 w-10 rounded-full flex items-center justify-center border transition ${
              darkMode
                ? "bg-slate-800 border-white/10 text-white"
                : "bg-gray-100 border-gray-300 text-slate-900"
            }`}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`h-10 w-10 rounded-xl flex items-center justify-center border text-2xl transition ${
              darkMode
                ? "bg-slate-800 border-white/10 text-white"
                : "bg-gray-100 border-gray-300 text-slate-900"
            }`}
          >
            {isOpen ? "×" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden border-t px-6 py-5 transition-all duration-300 ${
            darkMode
              ? "bg-slate-950 border-white/10 text-gray-300"
              : "bg-white border-gray-200 text-gray-700"
          }`}
        >
          <div className="flex flex-col gap-5 font-medium">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>

            <Link to="/blogs" className="hover:text-fuchsia-500 transition">
              Blogs
            </Link>

            <Link to="/CategoryPage" onClick={() => setIsOpen(false)}>
              Categories
            </Link>

            <Link to="/featured" onClick={() => setIsOpen(false)}>
              Featured
            </Link>

            <Link to="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>

            <Link to="/features" onClick={() => setIsOpen(false)} className="hover:text-cyan-400 transition">
              Features
            </Link>

            <div
              className={`h-px ${darkMode ? "bg-white/10" : "bg-gray-200"}`}
            ></div>

            {user ? (
              <>
                <Link
                  to="/create-blog"
                  onClick={() => setIsOpen(false)}
                  className="text-fuchsia-400 font-semibold"
                >
                  Write Blog
                </Link>

                <Link
                  to="/my-blogs"
                  className="font-semibold text-gray-300 hover:text-cyan-400 transition"
                >
                  My Blogs
                </Link>

                <Link
                  to="/saved-blogs"
                  onClick={() => setIsOpen(false)}
                  className="font-semibold text-gray-300 hover:text-cyan-400 transition"
                >
                  Saved Blogs
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="text-cyan-400 font-semibold"
                >
                  Hi, {user.name}
                </Link>

                <button
                  onClick={logout}
                  className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-5 py-3 rounded-full shadow-lg shadow-fuchsia-500/20 transition text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 text-white px-5 py-3 rounded-full shadow-lg shadow-purple-500/30 transition text-center"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
