// src/layouts/AdminLayout.jsx
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, TrendingUp, Settings, LogOut, Users, FileText, Package, Menu, X, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    if (isMobileOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isMobileOpen]);

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', badge: '' },
    { path: '/admin/orders', icon: ShoppingBag, label: 'Orders', badge: '' },
    { path: '/admin/products', icon: TrendingUp, label: 'Products', badge: '' },
  ];

  const secondaryItems = [
    { path: '/admin/customers', icon: Users, label: 'Customers', badge: '' },
    { path: '/admin/reports', icon: FileText, label: 'Reports', badge: '' },
    { path: '/admin/settings', icon: Settings, label: 'Settings', badge: '' },
  ];

  const sidebarWidth = isCollapsed ? 80 : 280;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-[#111827] text-white flex-col shadow-2xl z-50
          fixed md:sticky top-0 h-screen
          transition-all duration-200
          ${isCollapsed ? 'w-[80px]' : 'w-[280px]'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          hidden md:flex
        `}
        style={{ width: isCollapsed ? 80 : 280 }}
      >
        <div className="p-4 border-b border-gray-800/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#cc1f1f] flex items-center justify-center shadow-md flex-shrink-0">
                <Package className="h-5 w-5 text-white" />
              </div>
              {!isCollapsed && (
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-white truncate">SuperIdeal</h2>
                  <p className="text-gray-500 text-[10px] truncate">Admin Panel</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg hover:bg-gray-800 text-gray-400"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <nav className="flex-1 py-5 px-3 overflow-y-auto overflow-x-hidden">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">
            {isCollapsed ? 'MENU' : 'Main'}
          </p>
          <div className="space-y-1.5 mb-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 whitespace-nowrap overflow-hidden ${
                    isActive
                      ? 'bg-[#cc1f1f] text-white shadow-md'
                      : 'text-gray-400 hover:bg-gray-800/80 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon size={16} className="flex-shrink-0" />
                  {!isCollapsed && <span className="truncate">{label}</span>}
                </div>
              </NavLink>
            ))}
          </div>

          <div className="border-t border-gray-800/60 pt-5">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">
              {isCollapsed ? 'MORE' : 'Management'}
            </p>
            <div className="space-y-1.5">
              {secondaryItems.map(({ path, icon: Icon, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 whitespace-nowrap overflow-hidden ${
                      isActive
                        ? 'bg-[#cc1f1f] text-white shadow-md'
                        : 'text-gray-400 hover:bg-gray-800/80 hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon size={16} className="flex-shrink-0" />
                    {!isCollapsed && <span className="truncate">{label}</span>}
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-3 border-t border-gray-800/60 bg-[#0a0a0a]">
          <div className={`bg-gray-900/80 rounded-xl p-3 mb-3 border border-gray-800/60 ${isCollapsed ? 'flex justify-center' : ''}`}>
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-9 h-9 rounded-full bg-[#cc1f1f] flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                A
              </div>
              {!isCollapsed && (
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">Admin User</p>
                  <p className="text-[10px] text-gray-500 truncate">admin@superideal.com</p>
                </div>
              )}
            </div>
          </div>
          <Link
            to="/"
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-center gap-2'} px-3 py-2 text-[13px] text-gray-400 hover:text-white bg-gray-900/80 hover:bg-[#cc1f1f] rounded-xl transition-all duration-200 border border-gray-800/60`}
          >
            <LogOut size={15} />
            {!isCollapsed && <span>Back to Store</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`
          bg-[#111827] text-white flex-col shadow-2xl z-50
          fixed top-0 left-0 h-screen
          transition-transform duration-300
          w-[280px]
          md:hidden flex
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-4 border-b border-gray-800/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#cc1f1f] flex items-center justify-center shadow-md">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">SuperIdeal</h2>
                <p className="text-gray-500 text-[10px]">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <nav className="flex-1 py-5 px-3 overflow-y-auto">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">Main</p>
          <div className="space-y-1.5 mb-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${
                    isActive ? 'bg-[#cc1f1f] text-white shadow-md' : 'text-gray-400 hover:bg-gray-800/80 hover:text-white'
                  }`
                }
              >
                <Icon size={16} />
                <span className="truncate">{label}</span>
              </NavLink>
            ))}
          </div>
          <div className="border-t border-gray-800/60 pt-5">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">Management</p>
            <div className="space-y-1.5">
              {secondaryItems.map(({ path, icon: Icon, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${
                      isActive ? 'bg-[#cc1f1f] text-white shadow-md' : 'text-gray-400 hover:bg-gray-800/80 hover:text-white'
                    }`
                  }
                >
                  <Icon size={16} />
                  <span className="truncate">{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
        <div className="p-3 border-t border-gray-800/60 bg-[#0a0a0a]">
          <Link
            to="/"
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center justify-center gap-2 px-3 py-2 text-[13px] text-gray-400 hover:text-white bg-gray-900/80 hover:bg-[#cc1f1f] rounded-xl transition-all duration-200 border border-gray-800/60"
          >
            <LogOut size={15} />
            <span>Back to Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <header className="bg-white shadow-sm border-b border-red-50 sticky top-0 z-30">
          <div className="px-4 md:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              >
                <Menu size={20} />
              </button>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              >
                {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-[11px] text-gray-500">Manage your bakery operations</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-red-50 text-[#cc1f1f] rounded-full text-[11px] font-semibold border border-red-100">
                <div className="w-1.5 h-1.5 rounded-full bg-[#cc1f1f]" />
                <span>Admin Mode</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
