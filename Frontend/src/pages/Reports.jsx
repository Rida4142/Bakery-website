import AdminLayout from '../layouts/AdminLayout'
import DashboardCard from '../components/Admin/DashboardCard'
import { FiDollarSign, FiShoppingCart, FiTrendingUp, FiBarChart2 } from 'react-icons/fi'

export default function Reports() {
  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#1F2937' }}>
          Reports
        </h1>
        <p style={{ color: '#6B7280' }}>Business analytics and insights</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Revenue"
          value="$45,230"
          icon={FiDollarSign}
          color="#E63946"
        />
        <DashboardCard
          title="Total Orders"
          value="1,248"
          icon={FiShoppingCart}
          color="#F4C542"
        />
        <DashboardCard
          title="Avg Order Value"
          value="$36.25"
          icon={FiTrendingUp}
          color="#3B82F6"
        />
        <DashboardCard
          title="Growth Rate"
          value="+12.5%"
          icon={FiBarChart2}
          color="#10B981"
        />
      </div>

      {/* Report Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Summary */}
        <div className="rounded-[20px] p-6 lg:p-8 shadow-md" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
          <h3 className="text-lg font-bold mb-6" style={{ color: '#1F2937' }}>
            Revenue Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <p style={{ color: '#6B7280' }}>This Month</p>
              <p className="text-lg font-bold" style={{ color: '#1F2937' }}>$12,458</p>
            </div>
            <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <p style={{ color: '#6B7280' }}>Last Month</p>
              <p className="text-lg font-bold" style={{ color: '#1F2937' }}>$10,920</p>
            </div>
            <div className="flex justify-between items-center">
              <p style={{ color: '#6B7280' }}>Difference</p>
              <p className="text-lg font-bold" style={{ color: '#10B981' }}>+14%</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="rounded-[20px] p-6 lg:p-8 shadow-md" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
          <h3 className="text-lg font-bold mb-6" style={{ color: '#1F2937' }}>
            Order Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <p style={{ color: '#6B7280' }}>Completed</p>
              <p className="text-lg font-bold" style={{ color: '#1F2937' }}>342</p>
            </div>
            <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: '#E5E7EB' }}>
              <p style={{ color: '#6B7280' }}>Pending</p>
              <p className="text-lg font-bold" style={{ color: '#1F2937' }}>28</p>
            </div>
            <div className="flex justify-between items-center">
              <p style={{ color: '#6B7280' }}>Cancellation Rate</p>
              <p className="text-lg font-bold" style={{ color: '#EF4444' }}>2.1%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Best Selling Products */}
      <div className="rounded-[20px] p-6 lg:p-8 shadow-md" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
        <h3 className="text-lg font-bold mb-6" style={{ color: '#1F2937' }}>
          Best Selling Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{[
             { name: 'Chocolate Croissant', sold: '456 units', revenue: '$2,280' },
             { name: 'Sourdough Bread', sold: '389 units', revenue: '$1,945' },
             { name: 'Danish Pastry', sold: '342 units', revenue: '$2,052' }
           ].map((product) => (
             <div
               key={product.name}
               className="p-4 rounded-lg border"
             >
              <p className="font-semibold mb-1" style={{ color: '#1F2937' }}>
                {product.name}
              </p>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>
                {product.sold}
              </p>
              <p className="text-sm font-semibold" style={{ color: '#E63946' }}>
                {product.revenue}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Note */}
      <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#FFF8F5', border: '1px solid #E5E7EB' }}>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          💡 <strong>Future Enhancement:</strong> Add interactive charts, date range filters, 
          and export functionality for detailed business reports.
        </p>
      </div>
    </AdminLayout>
  )
}
