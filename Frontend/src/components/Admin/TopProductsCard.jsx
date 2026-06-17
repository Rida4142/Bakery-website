import { useEffect, useState } from 'react';
import { getOrders } from '../../services/orderService';

export default function TopProductsCard() {
  const [topProducts, setTopProducts] = useState([]);
  useEffect(() => {
    const orders = getOrders();
    const productCount = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        productCount[item.name] = (productCount[item.name] || 0) + item.quantity;
      });
    });
    const sorted = Object.entries(productCount).sort((a,b) => b[1] - a[1]).slice(0,5);
    setTopProducts(sorted);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Top Selling Products</h3>
      <ul className="space-y-3">
        {topProducts.map(([name, qty]) => (
          <li key={name} className="flex justify-between">
            <span className="text-sm">{name}</span>
            <span className="font-medium">{qty} sold</span>
          </li>
        ))}
      </ul>
    </div>
  );
}