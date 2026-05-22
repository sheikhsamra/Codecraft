import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: null,
  });

  const [oldImage, setOldImage] = useState("");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const getBlog = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}`
      );

      const blog = res.data.blog;

      setFormData({
        title: blog.title,
        category: blog.category,
        image: null,
      });

      setOldImage(blog.image);

      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = blog.content;
        }
      }, 100);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch blog");
    }
  };

  useEffect(() => {
    getBlog();
  }, [id]);

  const runCommand = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
  };

  const highlightText = () => {
    document.execCommand("backColor", false, "yellow");
    editorRef.current.focus();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      image: file,
    });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const content = editorRef.current.innerHTML;

      if (!formData.title || !formData.category || !content) {
        setError("Title, category and content are required");
        return;
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("content", content);

      if (formData.image) {
        data.append("image", formData.image);
      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Blog updated successfully!");
      navigate("/my-blogs");
    } catch (error) {
      setError(error.response?.data?.message || "Blog update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-950 to-cyan-950 text-white px-4 py-14">
      <div className="max-w-4xl mx-auto bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-black">Edit Blog</h1>

        <p className="text-gray-400 mt-2 mb-8">
          Update your blog title, category, content, or image.
        </p>

        {error && (
          <p className="bg-red-500/10 border border-red-400/30 text-red-300 p-3 rounded-xl mb-5">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Blog title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="bg-white/10 border border-white/10 p-4 rounded-2xl outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="bg-white/10 border border-white/10 p-4 rounded-2xl outline-none focus:border-fuchsia-400"
          />

          <div className="flex flex-wrap gap-3 bg-slate-950/50 border border-white/10 p-3 rounded-2xl">
            <button
              type="button"
              onClick={() => runCommand("bold")}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 font-bold"
            >
              Bold
            </button>

            <button
              type="button"
              onClick={() => runCommand("italic")}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 italic"
            >
              Italic
            </button>

            <button
              type="button"
              onClick={highlightText}
              className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-bold"
            >
              Highlight
            </button>
          </div>

          <div
            ref={editorRef}
            contentEditable
            className="min-h-[220px] bg-white/10 border border-white/10 p-4 rounded-2xl outline-none focus:border-cyan-400 text-white"
          ></div>

          <div>
            <label className="block mb-2 text-gray-300">
              Change Blog Image Optional
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="bg-white/10 border border-white/10 p-4 rounded-2xl w-full"
            />
          </div>

          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-72 object-cover rounded-2xl"
            />
          ) : oldImage ? (
            <img
              src={oldImage}
              alt="Current blog"
              className="w-full h-72 object-cover rounded-2xl"
            />
          ) : null}

          <button
            disabled={loading}
            className="bg-gradient-to-r from-fuchsia-600 to-cyan-500 py-4 rounded-2xl font-bold disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBlog;