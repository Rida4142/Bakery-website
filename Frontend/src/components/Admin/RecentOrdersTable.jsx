import { FiEye } from 'react-icons/fi'
import StatusBadge from './StatusBadge'

// Mock data for recent orders
const mockOrders = [
  {
    id: '#ORD001',
    customer: 'John Doe',
    phone: '(555) 123-4567',
    amount: '$45.99',
    status: 'Delivered',
    date: 'Dec 12, 2024'
  },
  {
    id: '#ORD002',
    customer: 'Jane Smith',
    phone: '(555) 987-6543',
    amount: '$62.50',
    status: 'Out For Delivery',
    date: 'Dec 12, 2024'
  },
  {
    id: '#ORD003',
    customer: 'Mike Johnson',
    phone: '(555) 456-7890',
    amount: '$38.75',
    status: 'Preparing',
    date: 'Dec 12, 2024'
  },
  {
    id: '#ORD004',
    customer: 'Sarah Williams',
    phone: '(555) 321-0987',
    amount: '$55.00',
    status: 'Accepted',
    date: 'Dec 11, 2024'
  },
  {
    id: '#ORD005',
    customer: 'Robert Brown',
    phone: '(555) 654-3210',
    amount: '$71.25',
    status: 'Pending',
    date: 'Dec 11, 2024'
  }
]

export default function RecentOrdersTable() {
  return (
    <div className="rounded-[20px] overflow-hidden shadow-md" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
      {/* Header */}
      <div className="p-6 lg:p-8 border-b" style={{ borderColor: '#E5E7EB' }}>
        <h3 className="text-lg font-bold" style={{ color: '#1F2937' }}>
          Recent Orders
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: '#FFF8F5', borderBottom: '1px solid #E5E7EB' }}>
              <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#6B7280' }}>
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#6B7280' }}>
                Customer
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#6B7280' }}>
                Phone
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#6B7280' }}>
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#6B7280' }}>
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#6B7280' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order, index) => (
              <tr
                key={index}
                style={{ borderBottom: '1px solid #E5E7EB' }}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#E63946' }}>
                  {order.id}
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: '#1F2937' }}>
                  {order.customer}
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: '#6B7280' }}>
                  {order.phone}
                </td>
                <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#1F2937' }}>
                  {order.amount}
                </td>
                <td className="px-6 py-4 text-sm">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 transition"
                    style={{ color: '#E63946' }}
                  >
                    <FiEye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
