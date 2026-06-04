import { FiTrendingUp } from 'react-icons/fi'

// Mock data for top selling bakery items
const topProducts = [
  { name: 'Chocolate Croissant', sold: 456, revenue: '$2,280' },
  { name: 'Sourdough Bread', sold: 389, revenue: '$1,945' },
  { name: 'Danish Pastry', sold: 342, revenue: '$2,052' },
  { name: 'Blueberry Muffin', sold: 298, revenue: '$1,490' },
  { name: 'Cinnamon Roll', sold: 267, revenue: '$1,335' }
]

export default function TopProductsCard() {
  return (
    <div className="rounded-[20px] p-6 lg:p-8 shadow-md" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold" style={{ color: '#1F2937' }}>
          Top Selling Products
        </h3>
        <FiTrendingUp className="w-5 h-5" style={{ color: '#E63946' }} />
      </div>

      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div key={index} className="flex items-center justify-between pb-4 border-b last:border-b-0" style={{ borderColor: '#E5E7EB' }}>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>
                {index + 1}. {product.name}
              </p>
              <p className="text-xs" style={{ color: '#6B7280' }}>
                {product.sold} units
              </p>
            </div>
            <p className="text-sm font-bold" style={{ color: '#E63946' }}>
              {product.revenue}
            </p>
          </div>
        ))}
      </div>

      {/* See All Link */}
      <button className="w-full mt-4 py-2 rounded-lg font-medium transition" style={{ color: '#E63946', backgroundColor: '#FFF8F5' }}>
        View All Products →
      </button>
    </div>
  )
}
