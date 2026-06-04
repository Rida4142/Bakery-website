import AdminLayout from '../layouts/AdminLayout'
import RecentOrdersTable from '../components/Admin/RecentOrdersTable'
import { FiFilter, FiDownload } from 'react-icons/fi'

export default function Orders() {
  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#1F2937' }}>
          Orders
        </h1>
        <p style={{ color: '#6B7280' }}>Manage all customer orders</p>
      </div>

      {/* Filter and Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition"
          style={{
            backgroundColor: '#FFF8F5',
            color: '#E63946',
            border: '1px solid #E5E7EB'
          }}
        >
          <FiFilter className="w-5 h-5" />
          <span>Filter</span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-white transition"
          style={{
            backgroundColor: '#E63946'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#D62839'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#E63946'}
        >
          <FiDownload className="w-5 h-5" />
          <span>Export</span>
        </button>
      </div>

      {/* Orders Table */}
      <RecentOrdersTable />

      {/* Future Integration Note */}
      <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#FFF8F5', border: '1px solid #E5E7EB' }}>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          💡 <strong>Future Enhancement:</strong> Add order filters by status, date range, and customer. 
          Connect to backend API to fetch real orders from the database.
        </p>
      </div>
    </AdminLayout>
  )
}
