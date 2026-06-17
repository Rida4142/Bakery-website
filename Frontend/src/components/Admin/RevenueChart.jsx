import { useEffect, useState } from 'react';
import { getOrders } from '../../services/orderService';

export default function RevenueChart() {
  const [revenue, setRevenue] = useState([]);
  useEffect(() => {
    const orders = getOrders();
    const last7Days = [...Array(7)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toLocaleDateString();
    }).reverse();
    const dailyRevenue = last7Days.map(day => {
      const total = orders.filter(order => new Date(order.createdAt).toLocaleDateString() === day)
        .reduce((sum, order) => sum + order.total, 0);
      return total;
    });
    setRevenue(dailyRevenue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Revenue (Last 7 Days)</h3>
      <div className="h-64 flex items-end gap-2">
        {revenue.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-primary rounded-t-lg" style={{ height: `${(val / Math.max(...revenue, 1)) * 200}px` }}></div>
            <span className="text-xs mt-2">{val} Rs</span>
          </div>
        ))}
      </div>
    </div>
  );
}