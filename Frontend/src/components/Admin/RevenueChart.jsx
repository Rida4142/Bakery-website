// Mock data for revenue trend over last 7 days
const mockRevenueData = [
  { date: 'Mon', revenue: 2400 },
  { date: 'Tue', revenue: 1398 },
  { date: 'Wed', revenue: 9800 },
  { date: 'Thu', revenue: 3908 },
  { date: 'Fri', revenue: 4800 },
  { date: 'Sat', revenue: 3800 },
  { date: 'Sun', revenue: 5300 }
]

export default function RevenueChart() {
  // Find max value for scaling
  const maxValue = Math.max(...mockRevenueData.map(d => d.revenue))

  return (
    <div className="rounded-[20px] p-6 lg:p-8 shadow-md" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
      <h3 className="text-lg font-bold mb-6" style={{ color: '#1F2937' }}>
        Revenue Trend
      </h3>

      {/* Bar Chart using CSS */}
      <div className="space-y-4">
        {mockRevenueData.map((item, index) => {
          const percentage = (item.revenue / maxValue) * 100
          return (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: '#6B7280' }}>
                  {item.date}
                </span>
                <span className="text-sm font-bold" style={{ color: '#E63946' }}>
                  ${item.revenue}
                </span>
              </div>
              <div
                className="h-8 rounded-lg transition-all"
                style={{
                  backgroundColor: '#FEE2E4',
                  width: `${percentage}%`
                }}
              >
                <div
                  className="h-full rounded-lg"
                  style={{
                    backgroundColor: '#E63946',
                    width: '100%'
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
