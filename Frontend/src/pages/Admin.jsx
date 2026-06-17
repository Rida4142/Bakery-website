import { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import DashboardCard from '../components/Admin/DashboardCard';
import RevenueChart from '../components/Admin/RevenueChart';
import OrdersChart from '../components/Admin/OrdersChart';
import RecentOrdersTable from '../components/Admin/RecentOrdersTable';
import TopProductsCard from '../components/Admin/TopProductsCard';
import { FiDollarSign, FiShoppingCart, FiCoffee } from 'react-icons/fi';
import { getOrders } from '../services/orderService';

export default function Admin() {
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, menuItems: 28 });
  
  useEffect(() => {
    const orders = getOrders();
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    setStats({ totalRevenue: revenue, totalOrders: orders.length, menuItems: 28 });
  }, []);
  
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#1F2937' }}>Dashboard</h1>
        <p style={{ color: '#6B7280' }}>Welcome back to your bakery admin panel</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Total Revenue" value={`Rs. ${stats.totalRevenue}`} icon={FiDollarSign} color="#E63946" />
        <DashboardCard title="Total Orders" value={stats.totalOrders} icon={FiShoppingCart} color="#F4C542" />
        <DashboardCard title="Menu Items" value={stats.menuItems} icon={FiCoffee} color="#10B981" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueChart />
        <OrdersChart />
      </div>
      <div className="mb-8"><RecentOrdersTable /></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"></div>
        <TopProductsCard />
      </div>
    </AdminLayout>
  );
}