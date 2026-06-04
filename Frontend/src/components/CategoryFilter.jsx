const EMOJIS = {
  All: "🍽️", Donuts: "🍩", Cookies: "🍪",
  Breads: "🍞", Cakes: "🎂", Pastries: "🥐",
};

const CategoryFilter = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <div
          key={cat}
          onClick={() => onSelect(cat)}
          className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0"
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 transition-all
            ${selected === cat
              ? "bg-red-600 border-red-600"
              : "bg-white border-yellow-400"
            }`}
          >
            {selected === cat
              ? <span className="text-white text-xl">{EMOJIS[cat]}</span>
              : EMOJIS[cat]
            }
          </div>
          <span className={`text-xs ${selected === cat ? "text-red-600 font-medium" : "text-gray-500"}`}>
            {cat}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;