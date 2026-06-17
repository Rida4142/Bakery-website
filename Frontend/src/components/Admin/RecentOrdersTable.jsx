import { useEffect, useState } from 'react';
import { getOrders } from '../../services/orderService';

export default function RecentOrdersTable() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const allOrders = getOrders().slice(0, 5);
    setOrders(allOrders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Recent Orders</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr><th className="text-left py-2">Order ID</th><th>Customer</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-t">
                <td className="py-2 text-sm">{order.id.slice(-8)}</td>
                <td>{order.customer?.customerName}</td>
                <td>Rs.{order.total}</td>
                <td><span className="px-2 py-1 rounded-full text-xs bg-yellow-100">{order.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}