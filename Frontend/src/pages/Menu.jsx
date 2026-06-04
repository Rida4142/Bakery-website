import AdminLayout from '../layouts/AdminLayout'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'

// Mock menu items
const menuItems = [
  { id: 1, name: 'Chocolate Croissant', category: 'Pastries', price: '$5.00', stock: 45 },
  { id: 2, name: 'Sourdough Bread', category: 'Bread', price: '$4.50', stock: 32 },
  { id: 3, name: 'Danish Pastry', category: 'Pastries', price: '$6.00', stock: 28 },
  { id: 4, name: 'Blueberry Muffin', category: 'Cakes', price: '$5.00', stock: 54 },
  { id: 5, name: 'Cinnamon Roll', category: 'Pastries', price: '$5.00', stock: 39 }
]

export default function Menu() {
  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#1F2937' }}>
            Menu
          </h1>
          <p style={{ color: '#6B7280' }}>Manage bakery products and items</p>
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition whitespace-nowrap"
          style={{
            backgroundColor: '#E63946'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#D62839'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#E63946'}
        >
          <FiPlus className="w-5 h-5" />
          <span>Add Item</span>
        </button>
      </div>

      {/* Menu Items Table */}
      <div className="rounded-[20px] overflow-hidden shadow-md" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: '#FFF8F5', borderBottom: '1px solid #E5E7EB' }}>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#6B7280' }}>
                  Product Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#6B7280' }}>
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#6B7280' }}>
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#6B7280' }}>
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#6B7280' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr
                  key={item.id}
                  style={{ borderBottom: '1px solid #E5E7EB' }}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#1F2937' }}>
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: '#6B7280' }}>
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#E63946' }}>
                    {item.price}
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: '#1F2937' }}>
                    {item.stock} units
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        style={{ color: '#3B82F6' }}
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        style={{ color: '#EF4444' }}
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Future Integration Note */}
      <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#FFF8F5', border: '1px solid #E5E7EB' }}>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          💡 <strong>Future Enhancement:</strong> Connect to backend API to fetch menu items from database. 
          Add image upload, category management, and inventory tracking.
        </p>
      </div>
    </AdminLayout>
  )
}
