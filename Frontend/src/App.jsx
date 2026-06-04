import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MenuPage from './pages/MenuPage'
import HomePage from './pages/HomePage'
import TrackingPage from './pages/TrackingPage'
import AdminDashboard from './pages/AdminDashboard'
import Orders from './pages/Orders'
import Menu from './pages/Menu'
import SalesHistory from './pages/SalesHistory'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/menu" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/tracking" element={<TrackingPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/menu" element={<Menu />} />
        <Route path="/admin/sales" element={<SalesHistory />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/settings" element={<Settings />} />

        {/* Legacy admin page - redirect to dashboard */}
        <Route path="/admin-page" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App