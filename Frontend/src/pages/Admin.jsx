// src/pages/Admin.jsx
import { useEffect, useState, useMemo } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import DashboardCard from '../components/Admin/DashboardCard';
import { getOrders, getStatusColor, getOrderType } from '../services/orderService';
import { FiDollarSign, FiShoppingCart, FiCoffee, FiTrendingUp, FiClock, FiTruck } from 'react-icons/fi';

const REFRESH_INTERVAL = 5000;

const isToday = (dateStr) => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  return d.toDateString() === now.toDateString();
};

const getTodayRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).toISOString();
  return { start, end };
};

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const loadOrders = () => {
    setOrders(getOrders());
    setLastUpdated(new Date());
  };

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, REFRESH_INTERVAL);
    const handleStorage = (e) => {
      if (e.key === 'bakery_orders') loadOrders();
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const stats = useMemo(() => {
    const today = getTodayRange();
    const todayOrders = orders.filter(o => {
      const created = new Date(o.createdAt);
      return created >= new Date(today.start) && created <= new Date(today.end);
    });
    const weekOrders = orders.filter(o => {
      const created = new Date(o.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return created >= weekAgo;
    });
    const pendingCount = orders.filter(o => o.status === 'Pending').length;
    const deliveryCount = orders.filter(o => getOrderType(o) === 'delivery').length;
    const pickupCount = orders.filter(o => getOrderType(o) !== 'delivery').length;

    const todayRevenue = todayOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const weekRevenue = weekOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const avgOrderValue = orders.length ? Math.round(totalRevenue / orders.length) : 0;

    const productCount = {};
    orders.forEach(order => {
      order.items?.forEach(item => {
        const key = item.name;
        productCount[key] = (productCount[key] || 0) + (item.quantity || 1);
      });
    });
    const topProducts = Object.entries(productCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    const recentOrders = [...orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 8);

    return {
      totalRevenue,
      totalOrders: orders.length,
      todayRevenue,
      todayOrders: todayOrders.length,
      weekRevenue,
      weekOrders: weekOrders.length,
      pendingCount,
      deliveryCount,
      pickupCount,
      avgOrderValue,
      topProducts,
      recentOrders,
    };
  }, [orders]);

  const timeStr = lastUpdated.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Live bakery overview — auto-updates every 5s</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          Updated {timeStr}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <DashboardCard title="Today's Sales" value={`Rs. ${stats.todayRevenue}`} icon={FiDollarSign} color="#10B981" />
        <DashboardCard title="Today's Orders" value={stats.todayOrders} icon={FiShoppingCart} color="#3B82F6" />
        <DashboardCard title="Pending Orders" value={stats.pendingCount} icon={FiClock} color="#F59E0B" />
        <DashboardCard title="Avg. Order" value={`Rs. ${stats.avgOrderValue}`} icon={FiTrendingUp} color="#8B5CF6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <DashboardCard title="Total Revenue" value={`Rs. ${stats.totalRevenue}`} icon={FiDollarSign} color="#E63946" />
        <DashboardCard title="Total Orders" value={stats.totalOrders} icon={FiShoppingCart} color="#F4C542" />
        <DashboardCard title="This Week" value={`Rs. ${stats.weekRevenue}`} icon={FiTruck} color="#6366F1" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Top Selling Products</h3>
          {stats.topProducts.length === 0 ? (
            <p className="text-sm text-gray-400">No order history yet</p>
          ) : (
            <div className="space-y-3">
              {stats.topProducts.map(({ name, count }) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 truncate mr-3">{name}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-red-50 overflow-hidden max-w-[120px]">
                      <div
                        className="h-full rounded-full bg-[#cc1f1f]"
                        style={{ width: `${Math.min(100, (count / (stats.topProducts[0]?.count || 1)) * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Today's Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-xl p-4">
              <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide">Pickup</p>
              <p className="text-2xl font-bold text-emerald-700 mt-1">{stats.pickupCount}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Delivery</p>
              <p className="text-2xl font-bold text-blue-700 mt-1">{stats.deliveryCount}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Week Orders</p>
              <p className="text-2xl font-bold text-amber-700 mt-1">{stats.weekOrders}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">Week Revenue</p>
              <p className="text-lg font-bold text-purple-700 mt-1">Rs. {stats.weekRevenue}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Recent Orders</h3>
        {stats.recentOrders.length === 0 ? (
          <p className="text-sm text-gray-400">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Order ID</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Customer</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Type</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Total</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map(order => {
                  const orderType = getOrderType(order);
                  return (
                    <tr key={order.id} className="border-b border-gray-50">
                      <td className="py-3 px-3 font-medium text-gray-800">#{order.id.slice(-8)}</td>
                      <td className="py-3 px-3 text-gray-700">{order.customer?.customerName || 'Guest'}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${orderType === 'delivery' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                          {orderType === 'delivery' ? 'Delivery' : 'Pickup'}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-gray-800">Rs. {order.total}</td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
