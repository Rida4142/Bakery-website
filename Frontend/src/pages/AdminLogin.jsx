// src/pages/AdminLogin.jsx
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Package, Eye, EyeOff, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return sessionStorage.getItem('adminAuth') === 'true';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const storedEmail = sessionStorage.getItem('adminEmail');
      const storedPassword = sessionStorage.getItem('adminPassword');

      if (!storedEmail && !storedPassword) {
        sessionStorage.setItem('adminEmail', 'admin@superideal.com');
        sessionStorage.setItem('adminPassword', 'admin123');
      }

      const validEmail = storedEmail || 'admin@superideal.com';
      const validPassword = storedPassword || 'admin123';

      if (email === validEmail && password === validPassword) {
        sessionStorage.setItem('adminAuth', 'true');
        navigate('/admin');
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 600);
  };

  if (isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] to-[#1f2937] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#cc1f1f] shadow-xl mb-4">
            <Package className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">SuperIdeal</h1>
          <p className="text-gray-400 text-sm mt-1">Bakery Admin Panel</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in to access the admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@superideal.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#cc1f1f] focus:border-transparent transition text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#cc1f1f] focus:border-transparent transition text-sm pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#cc1f1f] hover:bg-[#a81a1a] disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Demo credentials will be pre-filled on first visit
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
