// src/pages/AdminProducts.jsx
import { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import API from '../services/api';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiSave, FiRefreshCw } from 'react-icons/fi';

const DEFAULT_FORM = {
  name: '',
  description: '',
  image: '',
  price: '',
  sizes: '',
  available: true,
  categoryId: '',
  hasSizes: false,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // ---- Load products & categories from API ----
  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [prodRes, catRes] = await Promise.all([
        API.get('/admin/products'),
        API.get('/admin/categories'),
      ]);
      setProducts(prodRes.data || []);
      setCategories(catRes.data || []);
    } catch (err) {
      setError('Failed to load data. Please refresh.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---- Open Add / Edit modal ----
  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      ...DEFAULT_FORM,
      categoryId: categories.length > 0 ? categories[0]._id : '',
    });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    const hasSizes = product.sizes && product.sizes.length > 0;
    setFormData({
      name: product.name || '',
      description: product.description || '',
      image: product.image || '',
      price: product.price || '',
      sizes: hasSizes ? JSON.stringify(product.sizes) : '',
      available: product.available !== false,
      categoryId: product.categoryId?._id || product.categoryId || '',
      hasSizes,
    });
    setShowModal(true);
  };

  // ---- Submit Add / Update ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        available: formData.available,
        categoryId: formData.categoryId,
      };

      if (formData.hasSizes) {
        try {
          payload.sizes = JSON.parse(formData.sizes);
          payload.price = undefined;
        } catch {
          alert('Invalid sizes JSON. Format: [{"label":"S","price":750},{"label":"M","price":1100}]');
          setSaving(false);
          return;
        }
      } else {
        payload.price = Number(formData.price);
        payload.sizes = [];
      }

      if (editingProduct) {
        await API.put(`/admin/products/${editingProduct._id}`, payload);
      } else {
        await API.post('/admin/products', payload);
      }

      setShowModal(false);
      fetchData(); // reload list
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  // ---- Delete ----
  const handleDelete = async (product) => {
    if (!confirm(`Delete "${product.name}"?`)) return;
    try {
      await API.delete(`/admin/products/${product._id}`);
      fetchData();
    } catch {
      alert('Failed to delete product');
    }
  };

  // ---- Toggle availability ----
  const handleToggle = async (product) => {
    try {
      await API.patch(`/admin/products/${product._id}/toggle`);
      setProducts(prev =>
        prev.map(p => p._id === product._id ? { ...p, available: !p.available } : p)
      );
    } catch {
      alert('Failed to toggle availability');
    }
  };

  // ---- Filter products ----
  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.categoryId?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-500 text-sm mt-1">
            {loading ? 'Loading...' : `${products.length} products in menu`}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
          >
            <FiRefreshCw size={16} /> Refresh
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#cc1f1f] hover:bg-[#a81a1a] text-white font-semibold rounded-xl transition shadow-sm"
          >
            <FiPlus size={18} /> Add Product
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc1f1f] focus:border-transparent"
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 text-red-600 border border-red-200 rounded-2xl p-4 mb-6 text-sm">
          {error}
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-[#cc1f1f] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          {search ? 'No products match your search.' : 'No products yet. Add your first product!'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(product => (
            <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition">
              <div className="relative h-44 bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWJlZGJlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZpbGw9IiM5Y2EzYWYiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                  }}
                />
                {!product.available && (
                  <span className="absolute top-2 left-2 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded-full">HIDDEN</span>
                )}
                {product.pickupOnly && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">PICKUP</span>
                )}
              </div>
              <div className="p-4">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {product.categoryId?.name || 'Uncategorized'}
                </p>
                <h3 className="font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">{product.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-lg font-bold text-[#cc1f1f]">
                    {product.sizes && product.sizes.length > 0
                      ? `Rs. ${product.sizes[0].price}+`
                      : `Rs. ${product.price}`}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggle(product)}
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${product.available ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                    >
                      {product.available ? 'Live' : 'Hidden'}
                    </button>
                    <button
                      onClick={() => openEditModal(product)}
                      className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---- Add/Edit Modal ---- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h3 className="text-lg font-bold text-gray-800">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select category</option>
                    {categories.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Image */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    className="input-field"
                  />
                  {formData.image && (
                    <div className="mt-2 w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ViZWRiZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QcmV2aWV3IGZhaWxlZDwvdGV4dD48L3N2Zz4='; }}
                      />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-field"
                  />
                </div>

                {/* Has Sizes checkbox */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasSizes}
                      onChange={(e) => setFormData({ ...formData, hasSizes: e.target.checked })}
                      className="rounded text-[#cc1f1f] focus:ring-[#cc1f1f]"
                    />
                    This product has multiple sizes (S, M, L, XL, etc.)
                  </label>
                </div>

                {/* Price or Sizes JSON */}
                {formData.hasSizes ? (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sizes (JSON) *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.sizes}
                      onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                      placeholder='[{"label":"S","price":750},{"label":"M","price":1100}]'
                      className="input-field font-mono text-xs"
                    />
                    <p className="text-xs text-gray-400 mt-1">Array of objects with "label" and "price"</p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs.) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="input-field"
                    />
                  </div>
                )}

                {/* Available checkbox */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                      className="rounded text-[#cc1f1f] focus:ring-[#cc1f1f]"
                    />
                    Available on menu
                  </label>
                </div>
              </div>

              {/* Form actions */}
              <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#cc1f1f] hover:bg-[#a81a1a] text-white font-semibold rounded-xl transition disabled:opacity-50"
                >
                  <FiSave size={16} />
                  {saving ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}