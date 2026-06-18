import { useLocation, Link } from 'react-router-dom'
import {
  FiHome,
  FiShoppingCart,
  FiCoffee,
  FiTrendingUp,
  FiBarChart2,
  FiSettings,
  FiX
} from 'react-icons/fi'

export default function Sidebar({ open, setOpen }) {
  const location = useLocation()

  const menuItems = [
    { name: 'Dashboard', icon: FiHome, path: '/admin' },
    { name: 'Orders', icon: FiShoppingCart, path: '/admin/orders' },
    { name: 'Menu', icon: FiCoffee, path: '/admin/menu' },
    { name: 'Sales History', icon: FiTrendingUp, path: '/admin/sales' },
    { name: 'Reports', icon: FiBarChart2, path: '/admin/reports' },
    { name: 'Settings', icon: FiSettings, path: '/admin/settings' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static left-0 top-0 h-screen w-64 lg:w-72 transition-transform duration-300 z-40 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ backgroundColor: '#FFFFFF', borderRight: '1px solid #E5E7EB' }}
      >
        {/* Close Button (Mobile) */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Logo Area */}
        <div className="p-8 border-b" style={{ borderColor: '#E5E7EB' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: '#E63946' }}>
              🥐
            </div>
            <div>
              <h2 className="font-bold text-lg" style={{ color: '#1F2937' }}>SuperIdeal</h2>
              <p className="text-xs" style={{ color: '#6B7280' }}>Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col p-6 gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  active
                    ? 'text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={active ? { backgroundColor: '#E63946' } : {}}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t" style={{ borderColor: '#E5E7EB' }}>
          <p className="text-xs" style={{ color: '#6B7280' }}>
            © 2024 SuperIdeal. All rights reserved.
          </p>
        </div>
      </aside>
    </>
  )
}
