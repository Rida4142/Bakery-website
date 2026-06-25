// src/pages/Admin.jsx
import { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import DashboardCard from '../components/Admin/DashboardCard';
import API from '../services/api';
import { getStatusColor } from '../services/orderService';
import { FiDollarSign, FiShoppingCart, FiTrendingUp, FiClock, FiTruck } from 'react-icons/fi';
import { Truck, Navigation } from 'lucide-react';

const REFRESH_INTERVAL = 15000;

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const loadDashboard = async () => {
    try {
      const [dashRes, ordersRes] = await Promise.all([
        API.get('/admin/dashboard'),
        API.get('/orders/admin?limit=8'),
      ]);
      setStats(dashRes.data);
      setRecentOrders(ordersRes.data.orders || []);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
    const interval = setInterval(loadDashboard, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const timeStr = lastUpdated.toLocaleTimeString('en-PK', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#cc1f1f] border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Live bakery overview</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          Updated {timeStr}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <DashboardCard title="Today's Orders" value={stats?.todayOrders ?? 0} icon={FiShoppingCart} color="#3B82F6" />
        <DashboardCard title="Today's Revenue" value={`Rs. ${stats?.todayRevenue ?? 0}`} icon={FiDollarSign} color="#10B981" />
        <DashboardCard title="Pending Orders" value={stats?.pendingOrders ?? 0} icon={FiClock} color="#F59E0B" />
        <DashboardCard title="Total Products" value={stats?.totalProducts ?? 0} icon={FiTrendingUp} color="#8B5CF6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <DashboardCard title="Total Revenue" value={`Rs. ${stats?.totalRevenue ?? 0}`} icon={FiDollarSign} color="#E63946" />
        <DashboardCard title="Total Orders" value={stats?.totalOrders ?? 0} icon={FiShoppingCart} color="#F4C542" />
        <DashboardCard title="Avg. Order Value" value={`Rs. ${stats?.totalOrders ? Math.round((stats?.totalRevenue || 0) / stats.totalOrders) : 0}`} icon={FiTruck} color="#6366F1" />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-gray-400">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Order #</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Customer</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Type</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Total</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order._id} className="border-b border-gray-50">
                    <td className="py-3 px-3 font-medium text-gray-800">#{order.orderNumber}</td>
                    <td className="py-3 px-3 text-gray-700">{order.customerName || 'Guest'}</td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${order.orderType === 'delivery' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                        {order.orderType === 'delivery' ? <Truck size={10} /> : <Navigation size={10} />}
                        {order.orderType === 'delivery' ? 'Delivery' : 'Pickup'}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-800">Rs. {order.totalAmount}</td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}