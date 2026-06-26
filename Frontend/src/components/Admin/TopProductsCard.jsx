import { useEffect, useState } from 'react';
import { getTopProducts } from '../../services/api';

export default function TopProductsCard() {
  const [topProducts, setTopProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await getTopProducts();
        setTopProducts(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load top products');
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Top Selling Products</h3>
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <ul className="space-y-3">
{topProducts.map((product, idx) => (
            <li key={`${product.name || 'unknown'}-${idx}`} className="flex justify-between">
              <span className="text-sm">{product.name}</span>
              <span className="font-medium">{product.count} sold</span>
            </li>
          ))}
         </ul>
      )}
    </div>
  );
}