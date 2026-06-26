// Mock data for orders count over last 7 days
const mockOrdersData = [
  { date: 'Mon', orders: 12 },
  { date: 'Tue', orders: 8 },
  { date: 'Wed', orders: 24 },
  { date: 'Thu', orders: 15 },
  { date: 'Fri', orders: 19 },
  { date: 'Sat', orders: 18 },
  { date: 'Sun', orders: 22 }
]

export default function OrdersChart() {
  // Find max value for scaling
  const maxValue = Math.max(...mockOrdersData.map(d => d.orders))

  return (
    <div className="rounded-[20px] p-6 lg:p-8 shadow-md" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
      <h3 className="text-lg font-bold mb-6" style={{ color: '#1F2937' }}>
        Orders Trend
      </h3>

      {/* Bar Chart using CSS */}
      <div className="space-y-4">
{mockOrdersData.map((item) => {
          const percentage = (item.orders / maxValue) * 100
          return (
            <div key={item.date}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: '#6B7280' }}>
                  {item.date}
                </span>
                <span className="text-sm font-bold" style={{ color: '#F4C542' }}>
                  {item.orders} orders
                </span>
              </div>
              <div
                className="h-8 rounded-lg transition-all"
                style={{
                  backgroundColor: '#FEF3C7',
                  width: `${percentage}%`
                }}
              >
                <div
                  className="h-full rounded-lg"
                  style={{
                    backgroundColor: '#F4C542',
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
