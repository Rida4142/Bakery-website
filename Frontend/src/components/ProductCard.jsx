const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <p>{product.name}</p>
    </div>
  );
};

export default ProductCard;