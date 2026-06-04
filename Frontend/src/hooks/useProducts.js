import { useState, useEffect } from "react";
import { getProducts, getProductsByCategory } from "../services/api";

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
        setProducts(res.data);
      } catch {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [selectedCategory]);

  return { products, loading, error };
};

export default useProducts;