export default function StatusBadge({ status }) {
  const statusConfig = {
    pending: { color: '#F59E0B', bg: '#FEF3C7', text: 'Pending' },
    accepted: { color: '#10B981', bg: '#D1FAE5', text: 'Accepted' },
    preparing: { color: '#3B82F6', bg: '#DBEAFE', text: 'Preparing' },
    'out for delivery': { color: '#8B5CF6', bg: '#EDE9FE', text: 'Out For Delivery' },
    delivered: { color: '#22C55E', bg: '#DCFCE7', text: 'Delivered' }
  }

  const config = statusConfig[status?.toLowerCase()] || statusConfig.pending

  return (
    <span
      className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      {config.text}
    </span>
  )
}
