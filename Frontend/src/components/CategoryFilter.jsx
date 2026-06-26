const EMOJIS = {
  All: "🍽️", Donuts: "🍩", Cookies: "🍪",
  Breads: "🍞", Cakes: "🎂", Pastries: "🥐",
};

const CategoryFilter = ({ categories, selected, onSelect }) => {
  const getLabel = (cat) => typeof cat === 'string' ? cat : cat.name;
  return (
    <div className="category-filter">
{categories.map((cat, idx) => {
        const label = getLabel(cat);
        const key = typeof cat === 'string' ? `${cat}-${idx}` : cat._id || cat.id || idx;
        return (
          <div key={key} className="category-item" onClick={() => onSelect(label)}>
            <div className={`category-circle ${selected === label ? "active" : ""}`}>
              {EMOJIS[label] || "🍽️"}
            </div>
            <span className={`category-label ${selected === label ? "active" : ""}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryFilter;