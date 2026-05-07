import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

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

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-950 text-white relative overflow-hidden px-4 py-12">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-950 via-slate-950 to-cyan-950"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <p className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-cyan-300 text-sm mb-4">
            User Dashboard
          </p>

          <h1 className="hero-heading text-5xl md:text-6xl font-black">
            Your{" "}
            <span className="animate-gradient-text text-transparent bg-clip-text bg-linear-to-r from-fuchsia-400 via-purple-400 to-cyan-400">
              Profile
            </span>
          </h1>

          <p className="text-gray-400 mt-4">
            Manage your Codecraftt account information.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-400/30 text-red-300 p-4 rounded-2xl mb-6 max-w-3xl mx-auto">
            {error}
          </div>
        )}

        {profile ? (
          <div className="animate-fade-up-delay max-w-4xl mx-auto">
            {/* Main Profile Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-4xl shadow-2xl overflow-hidden">
              {/* Top Banner */}
              <div className="relative h-36 bg-linear-to-r from-fuchsia-600 via-purple-600 to-cyan-500">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute -bottom-14 left-8 md:left-10">
                  <div className="w-28 h-28 rounded-3xl bg-slate-950 border-4 border-white/20 shadow-2xl flex items-center justify-center">
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-fuchsia-400 to-cyan-400">
                      {profile.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="pt-20 px-8 md:px-10 pb-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black capitalize">
                      {profile.name}
                    </h2>
                    <p className="text-gray-400 mt-2">{profile.email}</p>
                  </div>

                  <div className="w-fit px-5 py-2 rounded-full bg-green-500/10 border border-green-400/20 text-green-300 font-semibold">
                    Active Account
                  </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-5 mt-8">
                  <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-5 hover:border-cyan-400/40 transition">
                    <p className="text-gray-400 text-sm">Role</p>
                    <h3 className="text-xl font-bold text-cyan-300 mt-2">
                      Blog Reader
                    </h3>
                  </div>

                  <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-5 hover:border-fuchsia-400/40 transition">
                    <p className="text-gray-400 text-sm">Authentication</p>
                    <h3 className="text-xl font-bold text-fuchsia-300 mt-2">
                      JWT Secure
                    </h3>
                  </div>

                  <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-5 hover:border-purple-400/40 transition">
                    <p className="text-gray-400 text-sm">Platform</p>
                    <h3 className="text-xl font-bold text-purple-300 mt-2">
                      BlogNest
                    </h3>
                  </div>
                </div>

                {/* User ID */}
                <div className="mt-6 bg-slate-950/40 border border-white/10 rounded-2xl p-5">
                  <p className="text-gray-400 text-sm mb-2">User ID</p>
                  <p className="text-gray-200 font-semibold break-all">
                    {profile._id}
                  </p>
                </div>

                {/* Welcome Box */}
                <div className="mt-8 rounded-3xl bg-linear-to-r from-fuchsia-600/20 via-purple-600/20 to-cyan-500/20 border border-white/10 p-6">
                  <h3 className="text-2xl font-black">
                    Welcome back, {profile.name} ✨
                  </h3>

                  <p className="text-gray-300 mt-3 leading-relaxed">
                    Your account is successfully authenticated. Now you can move
                    forward and build real blog features like creating posts,
                    editing blogs, deleting blogs, and searching articles from
                    MongoDB.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white/10 border border-white/10 rounded-3xl p-8 text-center">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-300 mt-5">Loading your profile...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;