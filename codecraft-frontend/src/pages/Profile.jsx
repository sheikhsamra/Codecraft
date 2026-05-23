import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [myBlogs, setMyBlogs] = useState([]);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("published"); // 'published' or 'saved'
  const [error, setError] = useState("");
  const [blogLoading, setBlogLoading] = useState(true);
  const [savedLoading, setSavedLoading] = useState(true);

  // Edit Profile States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ name: "", bio: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const token = localStorage.getItem("token");

  const getProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data.user);
      setEditData({ name: res.data.user.name, bio: res.data.user.bio || "" });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch profile");
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("bio", editData.bio);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile(res.data.user);
      const localUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify({ ...localUser, ...res.data.user }));
      
      setIsEditModalOpen(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!window.confirm("Are you sure you want to remove your profile picture?")) return;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/auth/profile/image`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data.user);
      const localUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify({ ...localUser, profileImage: "" }));
      alert("Profile picture removed");
    } catch (error) {
      alert("Failed to remove image");
    }
  };

  const getMyBlogs = async () => {
    try {
      setBlogLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blogs/user/my-blogs`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMyBlogs(res.data.blogs || []);
    } catch (error) {
      console.log("Failed to fetch blogs");
    } finally {
      setBlogLoading(false);
    }
  };

  const getSavedBlogs = async () => {
    try {
      setSavedLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blogs/user/saved-blogs`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSavedBlogs(res.data.blogs || []);
    } catch (error) {
      console.log("Failed to fetch saved blogs");
    } finally {
        setSavedLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedBlog = res.data.blog;
      setMyBlogs((prev) => prev.map((blog) => (blog._id === id ? updatedBlog : blog)));
      setSavedBlogs((prev) => prev.map((blog) => (blog._id === id ? updatedBlog : blog)));
    } catch (error) {
      console.log("Like failed");
    }
  };

  const handleSave = async (id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}/save`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.message.includes("removed")) {
          setSavedBlogs(savedBlogs.filter(b => b._id !== id));
      } else {
          getSavedBlogs();
      }
    } catch (error) {
        console.log("Save failed");
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyBlogs(myBlogs.filter((blog) => blog._id !== id));
      alert("Blog deleted successfully");
    } catch (error) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    getProfile();
    getMyBlogs();
    getSavedBlogs();
  }, []);

  const totalLikes = myBlogs.reduce((sum, blog) => sum + (blog.likes?.length || 0), 0);
  const totalViews = myBlogs.reduce((sum, blog) => sum + (blog.views || 0), 0);
  const totalComments = myBlogs.reduce((sum, blog) => sum + (blog.comments?.length || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-950 to-cyan-950 text-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {error && (
          <div className="bg-red-500/10 border border-red-400/20 text-red-300 p-4 rounded-2xl mb-8">
            {error}
          </div>
        )}

        {profile && (
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden mb-12 relative">
            <div className="h-32 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500"></div>
            
            {/* Action Group - Top Right */}
            <div className="absolute top-36 right-8 flex flex-col items-center gap-2">
              <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="p-3 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg"
                  title="Edit Profile"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.199Z" />
                  </svg>
              </button>
              <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 font-black text-[9px] uppercase tracking-widest shadow-sm">
                Active
              </span>
            </div>

            <div className="px-8 pb-10 -mt-16 flex flex-col items-start text-left">
              {/* Image Section */}
              <div className="relative group mb-6">
                {profile.profileImage ? (
                  <img 
                    src={profile.profileImage} 
                    alt={profile.name} 
                    className="w-32 h-32 md:w-36 md:h-36 rounded-3xl object-cover border-4 border-slate-900 shadow-2xl transition-all duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-3xl bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-cyan-500 border-4 border-slate-900 shadow-2xl flex items-center justify-center text-7xl font-black text-white transition-all duration-300 group-hover:scale-105">
                    {profile.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                
                {/* Verified Badge */}
                <div className="absolute bottom-1 right-1 bg-blue-500 p-1 rounded-full border-2 border-slate-900 shadow-lg">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.307 4.491 4.491 0 0 1-1.307-3.497A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                   </svg>
                </div>
              </div>
              
              {/* Name & Email Section */}
              <div className="space-y-1">
                <h1 className="text-4xl font-black capitalize tracking-tight flex items-center gap-3">
                  {profile.name}
                </h1>
                <p className="text-cyan-400 font-medium">{profile.email}</p>
              </div>

              {/* Bio Section */}
              <p className="mt-6 text-gray-300 italic max-w-lg leading-relaxed bg-white/5 p-4 rounded-2xl border-l-4 border-fuchsia-500">
                "{profile.bio || "Crafting stories and building code. Welcome to my creative sanctuary."}"
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-10 w-full text-center">
                <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-4 hover:scale-105 hover:shadow-[0_0_20px_rgba(192,38,211,0.3)] transition-all duration-300 group">
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1 group-hover:text-fuchsia-400 transition-colors">Blogs</p>
                  <p className="text-lg font-black text-white">{myBlogs.length}</p>
                </div>
                <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-4 hover:scale-105 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300 group">
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1 group-hover:text-red-400 transition-colors">Likes</p>
                  <p className="text-lg font-black text-white">❤️ {totalLikes}</p>
                </div>
                <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-4 hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 group">
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1 group-hover:text-cyan-400 transition-colors">Views</p>
                  <p className="text-lg font-black text-white">👁️ {totalViews}</p>
                </div>
                <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-4 hover:scale-105 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all duration-300 group">
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1 group-hover:text-yellow-400 transition-colors">Comments</p>
                  <p className="text-lg font-black text-white">💬 {totalComments}</p>
                </div>
                <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-4 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 group">
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1 group-hover:text-blue-400 transition-colors">Saved</p>
                  <p className="text-lg font-black text-white">🔖 {savedBlogs.length}</p>
                </div>
                <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-4 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 group">
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1 group-hover:text-purple-400 transition-colors">Status</p>
                  <p className="text-lg font-black text-white">Writer</p>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  to="/create-blog"
                  className="inline-block bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition"
                >
                  Write New Blog
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tabs Section */}
        <div className="flex gap-4 mb-10 p-1.5 bg-slate-900/50 border border-white/10 rounded-2xl w-fit mx-auto shadow-inner">
          <button
            onClick={() => setActiveTab("published")}
            className={`px-10 py-3.5 rounded-xl font-black transition-all duration-500 ${
              activeTab === "published"
                ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-[0_0_20px_rgba(192,38,211,0.4)] scale-105"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Published ({myBlogs.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-10 py-3.5 rounded-xl font-black transition-all duration-500 ${
              activeTab === "saved"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Saved ({savedBlogs.length})
          </button>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTab === "published" ? (
             blogLoading ? (
               <p className="col-span-full text-center py-20 text-gray-400 font-bold">Loading your blogs...</p>
             ) : myBlogs.length > 0 ? (
               myBlogs.map((blog) => (
                 <div key={blog._id} className="group bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-3 hover:bg-white/15 hover:shadow-[0_20px_50px_rgba(192,38,211,0.15)] transition-all duration-500">
                   <div className="overflow-hidden">
                     <img src={blog.image} className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   <div className="p-6">
                     <div className="flex justify-between items-center">
                        <span className="text-sm text-cyan-300 bg-cyan-400/10 px-3 py-1 rounded-full group-hover:bg-cyan-400/20 transition-colors">{blog.category}</span>
                        <button onClick={() => handleSave(blog._id)} className="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-125">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={savedBlogs.some(b => b._id === blog._id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                           </svg>
                        </button>
                     </div>
                     <h3 className="text-2xl font-bold mt-4 group-hover:text-fuchsia-400 transition-colors duration-300 leading-tight">{blog.title}</h3>
                     <div className="text-gray-300 mt-3 leading-relaxed max-h-20 overflow-hidden group-hover:text-white transition-colors duration-300" dangerouslySetInnerHTML={{ __html: blog.content }} />
                     
                     <div className="mt-6 flex flex-wrap justify-between items-center text-sm text-gray-400 border-t border-white/5 pt-4">
                        <div className="flex items-center gap-3">
                           <button onClick={() => handleLike(blog._id)} className="flex items-center gap-1.5 hover:scale-125 transition-all duration-300 group/like">
                             <svg xmlns="http://www.w3.org/2000/svg" fill={profile && blog.likes?.includes(profile._id) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 transition ${profile && blog.likes?.includes(profile._id) ? "text-red-500" : "text-gray-400 group-hover/like:text-red-400"}`}>
                               <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                             </svg>
                             <span className={`transition-all duration-300 ${profile && blog.likes?.includes(profile._id) ? "text-red-500" : "text-gray-400"}`}>{blog.likes?.length || 0}</span>
                           </button>
                           <div className="flex items-center gap-1.5 hover:scale-125 transition-all duration-300 cursor-default group/stat">
                             <span className="group-hover/stat:text-yellow-400 transition-colors">⭐</span>
                             <span className="group-hover/stat:text-gray-200 transition-colors">{blog.averageRating || 0}</span>
                           </div>
                           <div className="flex items-center gap-1.5 hover:scale-125 transition-all duration-300 cursor-default group/stat">
                             <span className="group-hover/stat:text-cyan-400 transition-colors">👁️</span>
                             <span className="group-hover/stat:text-gray-200 transition-colors">{blog.views || 0}</span>
                           </div>
                           <div className="flex items-center gap-1.5 hover:scale-125 transition-all duration-300 cursor-default group/stat">
                                <span className="group-hover/stat:text-purple-400 transition-colors">💬</span>
                                <span className="group-hover/stat:text-gray-200 transition-colors">{blog.comments?.length || 0}</span>
                            </div>
                        </div>
                     </div>

                     {/* Profile Management Actions */}
                     <div className="flex gap-3 mt-6">
                        <Link to={`/edit-blog/${blog._id}`} className="flex-1 text-center bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 py-3 rounded-xl font-bold hover:bg-cyan-500/20 transition-all duration-300">Edit</Link>
                        <button onClick={() => deleteBlog(blog._id)} className="flex-1 bg-red-500/10 border border-red-400/20 text-red-300 py-3 rounded-xl font-bold hover:bg-red-500/20 transition-all duration-300">Delete</button>
                     </div>
                     <Link to={`/blogs/${blog._id}`} className="block mt-4 text-center text-fuchsia-400 font-bold hover:text-cyan-300 transition-all duration-300 uppercase text-xs tracking-widest">View Blog →</Link>
                   </div>
                 </div>
               ))
             ) : (
               <p className="col-span-full text-center py-20 bg-white/10 border border-white/10 rounded-3xl font-bold">No blogs published yet.</p>
             )
          ) : (
            savedLoading ? (
              <p className="col-span-full text-center py-20 text-gray-400 font-bold">Loading saved blogs...</p>
            ) : savedBlogs.length > 0 ? (
              savedBlogs.map((blog) => (
                <div key={blog._id} className="group bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-3 hover:bg-white/15 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] transition-all duration-500">
                   <div className="overflow-hidden">
                     <img src={blog.image} className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   <div className="p-6">
                     <div className="flex justify-between items-center">
                        <span className="text-sm text-cyan-300 bg-cyan-400/10 px-3 py-1 rounded-full group-hover:bg-cyan-400/20 transition-colors">{blog.category}</span>
                        <button onClick={() => handleSave(blog._id)} className="text-cyan-400 hover:scale-125 transition-all duration-300"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" /></svg></button>
                     </div>
                     <h3 className="text-2xl font-bold mt-4 group-hover:text-cyan-400 transition-colors duration-300 leading-tight">{blog.title}</h3>
                     <div className="text-gray-300 mt-3 leading-relaxed max-h-20 overflow-hidden group-hover:text-white transition-colors duration-300" dangerouslySetInnerHTML={{ __html: blog.content }} />
                     
                     <div className="mt-6 flex justify-between items-center text-sm text-gray-400 border-t border-white/5 pt-4">
                        <div className="flex items-center gap-3">
                           <button onClick={() => handleLike(blog._id)} className="flex items-center gap-1.5 hover:scale-125 transition-all duration-300 group/like">
                             <svg xmlns="http://www.w3.org/2000/svg" fill={profile && blog.likes?.includes(profile._id) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 transition ${profile && blog.likes?.includes(profile._id) ? "text-red-500" : "text-gray-400 group-hover/like:text-red-400"}`}>
                               <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                             </svg>
                             <span className={`transition-all duration-300 ${profile && blog.likes?.includes(profile._id) ? "text-red-500" : "text-gray-400"}`}>{blog.likes?.length || 0}</span>
                           </button>
                           <div className="flex items-center gap-1.5 hover:scale-125 transition-all duration-300 cursor-default group/stat">
                             <span className="group-hover/stat:text-yellow-400 transition-colors">⭐</span>
                             <span className="group-hover/stat:text-gray-200 transition-colors">{blog.averageRating || 0}</span>
                           </div>
                           <div className="flex items-center gap-1.5 hover:scale-125 transition-all duration-300 cursor-default group/stat">
                             <span className="group-hover/stat:text-cyan-400 transition-colors">👁️</span>
                             <span className="group-hover/stat:text-gray-200 transition-colors">{blog.views || 0}</span>
                           </div>
                           <div className="flex items-center gap-1.5 hover:scale-125 transition-all duration-300 cursor-default group/stat">
                                <span className="group-hover/stat:text-purple-400 transition-colors">💬</span>
                                <span className="group-hover/stat:text-gray-200 transition-colors">{blog.comments?.length || 0}</span>
                            </div>
                        </div>
                     </div>
                     <Link to={`/blogs/${blog._id}`} className="block mt-6 text-center border border-cyan-500/30 text-cyan-400 py-3 rounded-xl font-bold hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-cyan-500 hover:text-white hover:border-transparent hover:shadow-lg hover:scale-105 transition-all duration-300 uppercase text-xs tracking-widest">Read Full Blog</Link>
                   </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center py-20 bg-white/10 border border-white/10 rounded-3xl font-bold">No saved blogs yet.</p>
            )
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden animate-fade-up">
             <div className="h-2 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500"></div>
             <form onSubmit={handleProfileUpdate} className="p-8 md:p-10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-black">Edit Profile</h2>
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-3">Profile Picture</label>
                    <div className="flex items-center gap-5">
                       <img src={selectedFile ? URL.createObjectURL(selectedFile) : profile?.profileImage || "https://res.cloudinary.com/dzt66v7ab/image/upload/v1711200000/default-avatar.png"} className="w-20 h-20 rounded-2xl object-cover border-2 border-white/10" alt="Preview" />
                       <div className="flex flex-col gap-2">
                            <label className="cursor-pointer bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/10 transition text-center">
                                Change Photo
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                            </label>
                            {profile?.profileImage && (
                                <button 
                                    type="button" 
                                    onClick={handleDeleteImage}
                                    className="text-red-400 border border-red-400/20 bg-red-400/5 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-400/10 transition"
                                >
                                    Remove Photo
                                </button>
                            )}
                       </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Display Name</label>
                    <input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 outline-none focus:border-fuchsia-500 transition" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Short Bio</label>
                    <textarea value={editData.bio} onChange={(e) => setEditData({...editData, bio: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 outline-none focus:border-cyan-500 transition min-h-[100px] resize-none" placeholder="Tell us about yourself..." />
                  </div>
                </div>
                <div className="mt-10 flex gap-4">
                   <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-white/5 border border-white/10 py-4 rounded-2xl font-bold hover:bg-white/10 transition">Cancel</button>
                   <button type="submit" disabled={updateLoading} className="flex-1 bg-gradient-to-r from-fuchsia-600 to-cyan-500 py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-500/20 transition disabled:opacity-50">{updateLoading ? "Saving..." : "Update Profile"}</button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;