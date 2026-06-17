import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, TrendingUp, Settings } from 'lucide-react';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary">SweetBites Admin</h2>
        </div>
        <nav className="mt-6">
          <Link to="/admin" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary">
            <ShoppingBag size={20} /> Orders
          </Link>
          <Link to="/admin/products" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary">
            <TrendingUp size={20} /> Products
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary">
            <Settings size={20} /> Settings
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}