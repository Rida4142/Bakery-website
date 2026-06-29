import { useState, useEffect } from "react";
import { getProducts, getProductsByCategory, getCategories } from "../services/api";

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

const categoryIconMap = {
  pizza: '🍕',
  specials: '⭐',
  burgers: '🍔',
  shawarma: '🥙',
  'crispy chicken': '🍗',
  parathas: '🫓',
  panini: '🥪',
  extras: '➕',
  pastries: '🥐',
  donuts: '🍩',
  cakes: '🎂',
  all: '🍽️',
};

const getCategoryIcon = (name) => {
  const lowerName = (name || '').toLowerCase();
  return categoryIconMap[lowerName] || '🍰';
};

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 getCategories()
      .then(res => {
        if (Array.isArray(res.data)) {
          setCategories([{ id: 'all', name: 'All', icon: getCategoryIcon('all') }, ...res.data.map(c => ({
            id: c._id || c.id,
            name: c.name,
            icon: getCategoryIcon(c.name)
          }))]);
        } else {
          setCategories([{ id: 'all', name: 'All', icon: getCategoryIcon('all') }]);
        }
      })
      .catch(() => {
        setCategories([{ id: 'all', name: 'All', icon: getCategoryIcon('all') }]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { categories, loading };
};

export default useProducts;
export { useCategories };