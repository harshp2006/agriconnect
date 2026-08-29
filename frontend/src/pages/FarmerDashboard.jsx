import PriceChart from '../components/PriceChart.jsx'
import { useAuth } from '../context/AuthContext.jsx'

// Placeholder rows — swap for mockApi.js output next, then a real fetch
// once GET /farmer/listings (or whatever docs/api-contracts.md names it)
// is live.
const PLACEHOLDER_LISTINGS = [
  { id: 1, crop: 'Wheat', quantity: '500 kg', status: 'Listed' },
  { id: 2, crop: 'Tomatoes', quantity: '120 kg', status: 'Order placed' },
  { id: 3, crop: 'Onions', quantity: '300 kg', status: 'Listed' },
]

export default function FarmerDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl">
          {user?.name ? `Welcome, ${user.name}` : 'Farmer dashboard'}
        </h1>
        <p className="mt-1 text-soil-light">
          Your listings, current prices, and orders coming in.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card">
          <p className="text-sm text-soil-light">Active listings</p>
          <p className="price-tag mt-2 text-lg">3</p>
        </div>
        <div className="card">
          <p className="text-sm text-soil-light">Pending orders</p>
          <p className="price-tag mt-2 text-lg">1</p>
        </div>
        <div className="card">
          <p className="text-sm text-soil-light">This week's avg. price</p>
          <p className="price-tag mt-2 text-lg">₹45/kg</p>
        </div>
      </div>

      <PriceChart cropName="Wheat — price trend" />

      <div className="card">
        <h2 className="text-xl">Your listings</h2>
        <table className="mt-4 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-soil/10 text-soil-light">
              <th className="pb-2 font-medium">Crop</th>
              <th className="pb-2 font-medium">Quantity</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {PLACEHOLDER_LISTINGS.map((listing) => (
              <tr key={listing.id} className="border-b border-soil/5 last:border-0">
                <td className="py-3">{listing.crop}</td>
                <td className="py-3">{listing.quantity}</td>
                <td className="py-3">{listing.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
