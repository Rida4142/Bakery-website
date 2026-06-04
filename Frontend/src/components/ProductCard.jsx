const ProductCard = ({ product }) => {
  const EMOJI_MAP = {
    Cakes: "🎂", Pastries: "🥐", Breads: "🍞",
    Cookies: "🍪", Donuts: "🍩",
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-red-100 cursor-pointer hover:shadow-md transition-shadow">
      <div className="bg-red-50 h-24 flex items-center justify-center text-4xl">
        {product.image
          ? <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          : EMOJI_MAP[product.category] || "🍰"
        }
      </div>
      <div className="p-3">
        <p className="text-xs text-red-500 font-medium">{product.category}</p>
        <p className="text-sm font-medium text-gray-800 mt-0.5 truncate">{product.name}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium text-gray-900">${product.price}</span>
          <button className="w-7 h-7 rounded-full bg-red-600 text-white text-lg flex items-center justify-center hover:bg-red-700 transition-colors">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;