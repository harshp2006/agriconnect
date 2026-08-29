import { Link } from 'react-router-dom'
import { ROLES } from '../context/AuthContext.jsx'

const roleOptions = [
  {
    role: ROLES.FARMER,
    title: 'Farmer / FPO',
    blurb: 'List your harvest, see fair-price forecasts, track buyer orders.',
  },
  {
    role: ROLES.BUYER,
    title: 'Buyer / Consumer',
    blurb: 'Browse produce straight from farms and FPOs near you.',
  },
]

export default function RoleSelect() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-semibold">AgriConnect</h1>
        <p className="mt-2 text-soil-light">
          Straight from the farm, straight to the price board.
        </p>
      </div>

      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        {roleOptions.map((option) => (
          <Link
            key={option.role}
            to={`/${option.role}/login`}
            className="card text-left transition-shadow hover:shadow-md
              focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-leaf-dark"
          >
            <h2 className="text-xl">{option.title}</h2>
            <p className="mt-1 text-sm text-soil-light">{option.blurb}</p>
            <span className="mt-4 inline-block text-sm font-medium text-leaf-dark">
              Continue &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
