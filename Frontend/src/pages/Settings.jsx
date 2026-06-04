import { useState } from 'react'
import AdminLayout from '../layouts/AdminLayout'
import { FiSave } from 'react-icons/fi'

export default function Settings() {
  const [bakeryName, setBakeryName] = useState('BakeryBox')
  const [phoneNumber, setPhoneNumber] = useState('(555) 123-4567')
  const [address, setAddress] = useState('123 Main Street, New York, NY 10001')
  const [whatsappNumber, setWhatsappNumber] = useState('+1 (555) 123-4567')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // TODO: Connect to backend API to save settings
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    console.log({
      bakeryName,
      phoneNumber,
      address,
      whatsappNumber
    })
  }

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#1F2937' }}>
          Settings
        </h1>
        <p style={{ color: '#6B7280' }}>Manage your bakery information</p>
      </div>

      {/* Settings Form */}
      <div className="max-w-2xl mx-auto rounded-[20px] p-6 lg:p-8 shadow-md" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
        <div className="space-y-6">
          {/* Bakery Name */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2937' }}>
              Bakery Name
            </label>
            <input
              type="text"
              value={bakeryName}
              onChange={(e) => setBakeryName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition"
              style={{
                borderColor: '#E5E7EB',
                '--tw-ring-color': '#E63946'
              }}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2937' }}>
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition"
              style={{
                borderColor: '#E5E7EB',
                '--tw-ring-color': '#E63946'
              }}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2937' }}>
              Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="3"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition resize-none"
              style={{
                borderColor: '#E5E7EB',
                '--tw-ring-color': '#E63946'
              }}
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2937' }}>
              WhatsApp Number
            </label>
            <input
              type="tel"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition"
              style={{
                borderColor: '#E5E7EB',
                '--tw-ring-color': '#E63946'
              }}
            />
            <p className="text-xs mt-2" style={{ color: '#6B7280' }}>
              This number will be used for customer WhatsApp communications
            </p>
          </div>

          {/* Save Button */}
          <div className="pt-6 border-t" style={{ borderColor: '#E5E7EB' }}>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition w-full sm:w-auto"
              style={{
                backgroundColor: '#E63946'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#D62839'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#E63946'}
            >
              <FiSave className="w-5 h-5" />
              <span>Save Changes</span>
            </button>

            {/* Save Success Message */}
            {saved && (
              <p className="text-sm mt-4 p-3 rounded-lg" style={{ backgroundColor: '#DCFCE7', color: '#166534' }}>
                ✓ Settings saved successfully!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Implementation Notes */}
      <div className="mt-8 max-w-2xl mx-auto p-4 rounded-lg" style={{ backgroundColor: '#FFF8F5', border: '1px solid #E5E7EB' }}>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          💡 <strong>Future Enhancement:</strong> Connect to backend API to save bakery settings to database. 
          Add logo upload, business hours, and payment method configuration.
        </p>
      </div>
    </AdminLayout>
  )
}
