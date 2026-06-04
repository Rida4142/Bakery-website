export default function DashboardCard({ title, value, icon: Icon, color = '#E63946' }) {
  return (
    <div
      className="rounded-[20px] p-6 lg:p-8 shadow-md transition-transform hover:scale-105"
      style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
    >
      {/* Icon */}
      <div className="flex justify-between items-start mb-4">
        <div />
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ backgroundColor: color + '20' }}
        >
          <Icon className="w-7 h-7" style={{ color }} />
        </div>
      </div>

      {/* Content */}
      <p className="text-sm font-medium mb-2" style={{ color: '#6B7280' }}>
        {title}
      </p>
      <p className="text-3xl lg:text-4xl font-bold" style={{ color: '#1F2937' }}>
        {value}
      </p>
    </div>
  )
}
