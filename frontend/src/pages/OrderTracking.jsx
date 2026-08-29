import { useParams } from 'react-router-dom'

// Placeholder — swap for mockApi.js / GET /orders/:id once
// docs/api-contracts.md's order-status shape is wired up.
const STAGES = ['Placed', 'Confirmed', 'In transit', 'Delivered']
const PLACEHOLDER_ORDER = {
  id: 'ORD-1042',
  crop: 'Tomatoes, 40 kg',
  from: 'Anita Farms, Nashik',
  currentStage: 2, // index into STAGES
}

export default function OrderTracking() {
  const { orderId } = useParams()
  const order = { ...PLACEHOLDER_ORDER, id: orderId ?? PLACEHOLDER_ORDER.id }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Order tracking</h1>
        <p className="mt-1 text-soil-light">{order.id}</p>
      </div>

      <div className="card">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl">{order.crop}</h2>
          <span className="text-sm text-soil-light">from {order.from}</span>
        </div>

        <ol className="mt-6 flex items-center">
          {STAGES.map((stage, i) => {
            const reached = i <= order.currentStage
            return (
              <li key={stage} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      reached ? 'bg-leaf' : 'bg-soil/15'
                    }`}
                  />
                  <span
                    className={`text-xs ${reached ? 'text-leaf-dark font-medium' : 'text-soil-light'}`}
                  >
                    {stage}
                  </span>
                </div>
                {i < STAGES.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 ${
                      i < order.currentStage ? 'bg-leaf' : 'bg-soil/15'
                    }`}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
