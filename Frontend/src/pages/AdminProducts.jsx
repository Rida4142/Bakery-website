// src/pages/AdminProducts.jsx
import { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { products as staticProducts, saveProduct, deleteProduct as removeProduct } from '../data/products';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiImage, FiX } from 'react-icons/fi';
import { FiSave } from 'react-icons/fi';

const DEFAULT_PRODUCT = {
  id: '',
  name: '',
  price: '',
  category: 'Pizza',
  description: '',
  image: '',
  sizePriceMap: null,
  hasSize: false,
  pickupOnly: false,
};

export default function AdminProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_PRODUCT);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    reloadProducts();
  }, []);

  const reloadProducts = () => {
    setAllProducts(staticProducts);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ ...DEFAULT_PRODUCT, id: `custom-${Date.now()}` });
    setPreviewImage('');
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      sizePriceMap: product.sizePriceMap ? JSON.stringify(product.sizePriceMap) : '',
      hasSize: product.hasSize || false,
      pickupOnly: product.pickupOnly || false,
    });
    setPreviewImage(product.image);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      id: formData.id,
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      description: formData.description,
      image: formData.image,
      hasSize: formData.hasSize,
      pickupOnly: formData.pickupOnly,
    };
    if (formData.sizePriceMap) {
      try {
        product.sizePriceMap = JSON.parse(formData.sizePriceMap);
      } catch {
        alert('Invalid size price map JSON');
        return;
      }
    }
    saveProduct(product);
    setShowModal(false);
    reloadProducts();
  };

  const handleDelete = (product) => {
    if (confirm(`Delete "${product.name}"?`)) {
      removeProduct(product.id);
      reloadProducts();
    }
  };

  const handleImageChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, image: value });
    setPreviewImage(value);
  };

  const filtered = allProducts.filter(p => {
    const term = search.toLowerCase();
    return p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term);
  });

  const categories = [...new Set(allProducts.map(p => p.category))];

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-500 text-sm mt-1">Add, edit and manage bakery menu items</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#cc1f1f] hover:bg-[#a81a1a] text-white font-semibold rounded-xl transition shadow-sm"
        >
          <FiPlus size={18} />
          Add Product
        </button>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition">
            <div className="relative h-44 bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWJlZGJlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZpbGw9IiM5Y2EzYWYiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg=='; }}
              />
              {product.pickupOnly && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">PICKUP ONLY</span>
              )}
            </div>
            <div className="p-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{product.category}</p>
              <h3 className="font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mt-1">{product.description}</p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-lg font-bold text-[#cc1f1f]">Rs. {product.price}</p>
                <div className="flex items-center gap-1.5">
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h3 className="text-lg font-bold text-gray-800">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs.) *</label>
                  <input type="number" required min="0" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input-field">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    <option value="New Category">+ New Category</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input type="url" value={formData.image} onChange={handleImageChange} placeholder="https://..." className="input-field" />
                </div>
                {previewImage && (
                  <div className="md:col-span-2 flex justify-center">
                    <div className="relative w-40 h-40 rounded-xl overflow-hidden bg-gray-100">
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                  </div>
                )}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field" />
                </div>
                <div className="md:col-span-2">
                  <div className="flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" checked={formData.hasSize} onChange={(e) => setFormData({ ...formData, hasSize: e.target.checked })} className="rounded text-[#cc1f1f] focus:ring-[#cc1f1f]" />
                      Has Sizes (S/M/L/XL)
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" checked={formData.pickupOnly} onChange={(e) => setFormData({ ...formData, pickupOnly: e.target.checked })} className="rounded text-[#cc1f1f] focus:ring-[#cc1f1f]" />
                      Pickup Only
                    </label>
                  </div>
                </div>
                {formData.hasSize && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size Price Map (JSON)</label>
                    <textarea rows={3} value={formData.sizePriceMap} onChange={(e) => setFormData({ ...formData, sizePriceMap: e.target.value })} placeholder='{"S": 750, "M": 1100, "L": 1600, "XL": 2100}' className="input-field font-mono text-xs" />
                    <p className="text-xs text-gray-400 mt-1">Leave empty if only one price is used</p>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-[#cc1f1f] hover:bg-[#a81a1a] text-white font-semibold rounded-xl transition">
                  <FiSave size={16} />
                  {editingProduct ? 'Update' : 'Add'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
