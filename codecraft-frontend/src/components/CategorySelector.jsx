// src/components/CategorySelector.jsx
export default function CategorySelector({ categories, onSelect }) {
  return (
    <div className="flex flex-wrap gap-3 mb-10">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat === "All" ? "" : cat)}
          className="px-5 py-2 rounded-full bg-white/10 border border-white/10 hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-cyan-500 transition"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}