import { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { FiSave } from 'react-icons/fi';
import API from '../services/api';

export default function Settings() {
  const [settings, setSettings] = useState({
    bakeryName: '',
    phone: '',
    whatsappNumber: '',
    address: '',
    logo: '',
    theme: {
      primaryColor: '#E63946',
      secondaryColor: '#F4C542',
      accentColor: '#E63946',
      fontFamily: ''
    },
    settings: {
      showHeroBanner: true,
      showAnnouncement: false,
      announcementText: '',
      announcementColor: '#E63946',
      heroHeading: '',
      heroSubheading: '',
      heroImage: '',
      menuLayout: 'grid',
      onlineOrderingEnabled: true,
      requirePhone: false,
      requireAddress: false,
      requireEmail: false,
      openingHours: '',
      currencySymbol: 'Rs.'
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    API.get('/settings')
      .then(res => {
        setSettings(prev => ({
          ...prev,
          ...res.data,
          theme: { ...prev.theme, ...res.data.theme },
          settings: { ...prev.settings, ...res.data.settings }
        }));
      })
      .catch(err => {
        console.error('Failed to load settings:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleThemeChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      theme: { ...prev.theme, [field]: value }
    }));
  };

  const handleSettingsChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      settings: { ...prev.settings, [field]: value }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await API.put('/admin/settings', {
        bakeryName: settings.bakeryName,
        phone: settings.phone,
        whatsappNumber: settings.whatsappNumber,
        address: settings.address,
        logo: settings.logo,
        theme: settings.theme,
        settings: settings.settings
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save settings:', err);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-textSecondary">Loading settings...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-textPrimary">
          Settings
        </h1>
        <p className="text-textSecondary">Manage your bakery information and branding</p>
      </div>

      <div className="max-w-4xl space-y-8">
        {/* Bakery Info */}
        <div className="bg-white rounded-[20px] p-6 lg:p-8 shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-textPrimary">Bakery Info</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-textPrimary">Bakery Name</label>
              <input
                type="text"
                value={settings.bakeryName}
                onChange={(e) => handleChange('bakeryName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-textPrimary">Phone</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-textPrimary">WhatsApp Number</label>
              <input
                type="tel"
                value={settings.whatsappNumber}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-textPrimary">Address</label>
              <textarea
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                rows="3"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary transition resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-textPrimary">Logo URL</label>
              <input
                type="text"
                value={settings.logo}
                onChange={(e) => handleChange('logo', e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary transition"
              />
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="bg-white rounded-[20px] p-6 lg:p-8 shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-textPrimary">Branding</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-textPrimary">Primary Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.theme.primaryColor}
                  onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                  className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.theme.primaryColor}
                  onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-textPrimary">Secondary Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.theme.secondaryColor}
                  onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                  className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.theme.secondaryColor}
                  onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-textPrimary">Accent Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.theme.accentColor}
                  onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                  className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.theme.accentColor}
                  onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="bg-white rounded-[20px] p-6 lg:p-8 shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-textPrimary">Hero Banner</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.settings.showHeroBanner}
                onChange={(e) => handleSettingsChange('showHeroBanner', e.target.checked)}
                className="w-5 h-5 rounded"
              />
              <label className="text-sm font-semibold text-textPrimary">Show Hero Banner</label>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-textPrimary">Hero Heading</label>
              <input
                type="text"
                value={settings.settings.heroHeading}
                onChange={(e) => handleSettingsChange('heroHeading', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-textPrimary">Hero Subheading</label>
              <input
                type="text"
                value={settings.settings.heroSubheading}
                onChange={(e) => handleSettingsChange('heroSubheading', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-textPrimary">Hero Image URL</label>
              <input
                type="text"
                value={settings.settings.heroImage}
                onChange={(e) => handleSettingsChange('heroImage', e.target.value)}
                placeholder="https://example.com/hero.jpg"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary transition"
              />
            </div>
          </div>
        </div>

        {/* Announcement Bar */}
        <div className="bg-white rounded-[20px] p-6 lg:p-8 shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-textPrimary">Announcement Bar</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.settings.showAnnouncement}
                onChange={(e) => handleSettingsChange('showAnnouncement', e.target.checked)}
                className="w-5 h-5 rounded"
              />
              <label className="text-sm font-semibold text-textPrimary">Show Announcement</label>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-textPrimary">Announcement Text</label>
              <input
                type="text"
                value={settings.settings.announcementText}
                onChange={(e) => handleSettingsChange('announcementText', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-textPrimary">Announcement Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.settings.announcementColor}
                  onChange={(e) => handleSettingsChange('announcementColor', e.target.value)}
                  className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.settings.announcementColor}
                  onChange={(e) => handleSettingsChange('announcementColor', e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ordering */}
        <div className="bg-white rounded-[20px] p-6 lg:p-8 shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-textPrimary">Ordering</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.settings.onlineOrderingEnabled}
                onChange={(e) => handleSettingsChange('onlineOrderingEnabled', e.target.checked)}
                className="w-5 h-5 rounded"
              />
              <label className="text-sm font-semibold text-textPrimary">Online Ordering Enabled</label>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-textPrimary">Currency Symbol</label>
              <input
                type="text"
                value={settings.settings.currencySymbol}
                onChange={(e) => handleSettingsChange('currencySymbol', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-textPrimary">Opening Hours</label>
              <input
                type="text"
                value={settings.settings.openingHours}
                onChange={(e) => handleSettingsChange('openingHours', e.target.value)}
                placeholder="Mon - Sun: 7:00 AM - 3:00 AM"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary transition"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.settings.requirePhone}
                onChange={(e) => handleSettingsChange('requirePhone', e.target.checked)}
                className="w-5 h-5 rounded"
              />
              <label className="text-sm font-semibold text-textPrimary">Require Phone Number</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.settings.requireAddress}
                onChange={(e) => handleSettingsChange('requireAddress', e.target.checked)}
                className="w-5 h-5 rounded"
              />
              <label className="text-sm font-semibold text-textPrimary">Require Delivery Address</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.settings.requireEmail}
                onChange={(e) => handleSettingsChange('requireEmail', e.target.checked)}
                className="w-5 h-5 rounded"
              />
              <label className="text-sm font-semibold text-textPrimary">Require Email</label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition disabled:opacity-50 bg-brand-primary hover:bg-brand-accent"
          >
            <FiSave className="w-5 h-5" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>

        {saved && (
          <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            ✓ Settings saved successfully!
          </div>
        )}
      </div>
    </AdminLayout>
  );
}