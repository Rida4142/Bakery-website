import { useState, useEffect } from "react";
import { getProducts, getProductsByCategory } from "../services/api";

const transformProduct = (product) => {
  const hasSizes = product.sizes && product.sizes.length > 0;
  const sizePriceMap = hasSizes
    ? Object.fromEntries(product.sizes.map(s => [s.label, s.price]))
    : (product.sizes?.reduce((map, size) => ({ ...map, [size.label]: size.price }), {}) || product.sizePriceMap || null);
  
  return {
    id: product._id || product.id,
    _id: product._id || product.id,
    name: product.name,
    price: hasSizes ? (sizePriceMap.S || Object.values(sizePriceMap)[0]) : product.price,
    sizes: product.sizes || [],
    image: product.image,
    description: product.description,
    available: product.available ?? true,
    category: product.categoryId?.name || product.category,
    categoryId: product.categoryId?._id || product.categoryId,
    sizePriceMap,
    hasSize: hasSizes && Object.keys(sizePriceMap).length > 1,
  };
};

const useProducts = (selectedCategory) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);
        const res =
          selectedCategory && selectedCategory !== "All"
            ? await getProductsByCategory(selectedCategory)
            : await getProducts();
        const data = Array.isArray(res.data) ? res.data : [];
        setProducts(data.map(transformProduct));
      } catch (err) {
        console.error("Product fetch error:", err);
        setError("Failed to load products.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [selectedCategory]);

  return { products, loading, error };
};

export default useProducts;