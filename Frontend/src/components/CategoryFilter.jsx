const CategoryFilter = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-5 py-2 rounded-full border font-medium transition-all
            ${selected === cat
              ? "bg-amber-700 text-white border-amber-700"
              : "bg-white text-amber-700 border-amber-300 hover:bg-amber-50"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;