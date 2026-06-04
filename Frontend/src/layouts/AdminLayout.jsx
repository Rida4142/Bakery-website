import { useState } from 'react'
import Sidebar from '../components/Admin/Sidebar'

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#FFF8F5' }}>
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b" style={{ borderColor: '#E5E7EB' }}>
          <h1 className="text-lg font-semibold" style={{ color: '#1F2937' }}>Bakery Admin</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
