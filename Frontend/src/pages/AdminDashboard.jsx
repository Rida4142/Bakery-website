import AdminLayout from '../layouts/AdminLayout'
import DashboardCard from '../components/Admin/DashboardCard'
import RevenueChart from '../components/Admin/RevenueChart'
import OrdersChart from '../components/Admin/OrdersChart'
import RecentOrdersTable from '../components/Admin/RecentOrdersTable'
import TopProductsCard from '../components/Admin/TopProductsCard'
import { FiDollarSign, FiShoppingCart, FiCoffee } from 'react-icons/fi'

export default function AdminDashboard() {
  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#1F2937' }}>
          Dashboard
        </h1>
        <p style={{ color: '#6B7280' }}>Welcome back to your bakery admin panel</p>
      </div>

      {/* Top Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Total Revenue"
          value="$12,458"
          icon={FiDollarSign}
          color="#E63946"
        />
        <DashboardCard
          title="Total Orders"
          value="342"
          icon={FiShoppingCart}
          color="#F4C542"
        />
        <DashboardCard
          title="Menu Items"
          value="28"
          icon={FiCoffee}
          color="#10B981"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueChart />
        <OrdersChart />
      </div>

      {/* Recent Orders */}
      <div className="mb-8">
        <RecentOrdersTable />
      </div>

      {/* Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Space for additional content */}
        </div>
        <TopProductsCard />
      </div>
    </AdminLayout>
  )
}
