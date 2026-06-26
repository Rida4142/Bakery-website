import AdminLayout from '../layouts/AdminLayout'
import { FiDownload } from 'react-icons/fi'

// Mock sales history data
// In future implementation, this will be generated from delivered orders 
// grouped by createdAt date and summed by revenue
const salesHistory = [
  { date: 'Dec 12, 2024', orders: 12, revenue: '$2,450.00' },
  { date: 'Dec 11, 2024', orders: 18, revenue: '$3,820.50' },
  { date: 'Dec 10, 2024', orders: 15, revenue: '$3,125.75' },
  { date: 'Dec 09, 2024', orders: 22, revenue: '$4,560.25' },
  { date: 'Dec 08, 2024', orders: 19, revenue: '$3,950.00' },
  { date: 'Dec 07, 2024', orders: 25, revenue: '$5,120.80' },
  { date: 'Dec 06, 2024', orders: 20, revenue: '$4,230.50' }
]

export default function SalesHistory() {
  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#1F2937' }}>
            Sales History
          </h1>
          <p style={{ color: '#6B7280' }}>View your sales performance over time</p>
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition whitespace-nowrap"
          style={{
            backgroundColor: '#E63946'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#D62839'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#E63946'}
        >
          <FiDownload className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Sales Table */}
      <div className="rounded-[20px] overflow-hidden shadow-md" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: '#FFF8F5', borderBottom: '1px solid #E5E7EB' }}>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#6B7280' }}>
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#6B7280' }}>
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#6B7280' }}>
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
{salesHistory.map((entry) => (
                 <tr
                   key={entry.date}
                   style={{ borderBottom: '1px solid #E5E7EB' }}
                   className="hover:bg-gray-50 transition"
                 >
                  <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#1F2937' }}>
                    {entry.date}
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: '#6B7280' }}>
                    {entry.orders}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#10B981' }}>
                    {entry.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Implementation Notes */}
      <div className="mt-8 space-y-4">
        <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFF8F5', border: '1px solid #E5E7EB' }}>
          <p className="text-sm" style={{ color: '#6B7280' }}>
            💡 <strong>Future Implementation:</strong>
          </p>
          <ul className="text-sm mt-2 space-y-1" style={{ color: '#6B7280' }}>
            <li>• Generate sales history from delivered orders in the backend</li>
            <li>• Group orders by createdAt date</li>
            <li>• Sum revenue for each date</li>
            <li>• Add date range filters for custom reports</li>
            <li>• Generate CSV/PDF exports</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  )
}
