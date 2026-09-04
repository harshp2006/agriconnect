import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

// Shown until real data arrives — keeps the chart demoable in isolation.
// Shape should match whatever docs/api-contracts.md defines for price
// history once we wire mockApi.js / the real fetch in.
const SAMPLE_DATA = [
  { date: 'Mon', price: 42 },
  { date: 'Tue', price: 44 },
  { date: 'Wed', price: 41 },
  { date: 'Thu', price: 46 },
  { date: 'Fri', price: 45 },
  { date: 'Sat', price: 48 },
  { date: 'Sun', price: 47 },
]

function PriceTagTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="price-tag">
      <span className="text-xs text-soil-light">{label}</span>
      <span className="font-semibold">₹{payload[0].value}/kg</span>
    </div>
  )
}

/**
 * Renders a price-over-time line chart. This component owns presentation
 * only — it never fetches. Pass `data` as [{ date, price }, ...] once the
 * backend endpoint is live; falls back to sample data so it's demoable
 * standalone.
 *
 * This is first on the cut list if we fall behind — the fallback above
 * means it degrades to "chart with placeholder data" rather than breaking.
 */
export default function PriceChart({ data = SAMPLE_DATA, cropName }) {
  return (
    <div className="card">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-base">{cropName ?? 'Price trend'}</h3>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A211C" strokeOpacity={0.08} />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#5C4F45' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#5C4F45' }} axisLine={false} tickLine={false} />
          <Tooltip content={<PriceTagTooltip />} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#D68A1B"
            strokeWidth={2}
            dot={{ r: 3, fill: '#D68A1B' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
