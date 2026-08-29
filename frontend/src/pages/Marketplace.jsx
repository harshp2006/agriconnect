import { useState } from 'react'

// Placeholder — shape should match docs/api-contracts.md's listing object
// once mockApi.js / the real fetch replaces this.
const PLACEHOLDER_PRODUCE = [
  { id: 1, crop: 'Wheat', farmer: 'Ramesh FPO, Meerut', price: 24, unit: 'kg' },
  { id: 2, crop: 'Tomatoes', farmer: 'Anita Farms, Nashik', price: 18, unit: 'kg' },
  { id: 3, crop: 'Onions', farmer: 'Deccan Growers Collective', price: 21, unit: 'kg' },
  { id: 4, crop: 'Basmati Rice', farmer: 'Punjab AgriCoop', price: 62, unit: 'kg' },
]

export default function Marketplace() {
  const [query, setQuery] = useState('')

  const filtered = PLACEHOLDER_PRODUCE.filter((item) =>
    item.crop.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Marketplace</h1>
        <p className="mt-1 text-soil-light">Produce listed directly by farmers and FPOs.</p>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search crops..."
        className="w-full max-w-sm rounded-md border border-soil/15 bg-white/70 px-3 py-2
          text-sm focus:outline-none focus:ring-2 focus:ring-leaf/40"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div key={item.id} className="card flex flex-col">
            <h2 className="text-lg">{item.crop}</h2>
            <p className="text-sm text-soil-light">{item.farmer}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="price-tag">₹{item.price}/{item.unit}</span>
              <button className="btn-primary">Order</button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-soil-light">No produce matching "{query}" right now.</p>
        )}
      </div>
    </div>
  )
}
