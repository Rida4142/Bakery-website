const EMOJIS = {
  All: "🍽️", Donuts: "🍩", Cookies: "🍪",
  Breads: "🍞", Cakes: "🎂", Pastries: "🥐",
};

const CategoryFilter = ({ categories, selected, onSelect }) => {
  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <div key={cat} className="category-item" onClick={() => onSelect(cat)}>
          <div className={`category-circle ${selected === cat ? "active" : ""}`}>
            {EMOJIS[cat]}
          </div>
          <span className={`category-label ${selected === cat ? "active" : ""}`}>
            {cat}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;