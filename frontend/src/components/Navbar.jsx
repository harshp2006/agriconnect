import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth, ROLES } from '../context/AuthContext.jsx'

const linkClass = ({ isActive }) =>
  `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
    isActive ? 'bg-leaf text-wheat' : 'text-leaf-dark hover:bg-leaf/10'
  }`

export default function Navbar() {
  const { user, role, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="border-b border-soil/10 bg-wheat/95 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <span className="font-display text-lg font-semibold text-leaf-dark">
          AgriConnect
        </span>

        <nav className="flex items-center gap-1">
          {role === ROLES.FARMER && (
            <NavLink to="/farmer" className={linkClass}>
              Dashboard
            </NavLink>
          )}
          {role === ROLES.BUYER && (
            <NavLink to="/marketplace" className={linkClass}>
              Marketplace
            </NavLink>
          )}
          <NavLink to="/orders" className={linkClass}>
            Orders
          </NavLink>
          {user?.name && (
            <span className="ml-2 hidden text-sm text-soil-light sm:inline">
              {user.name}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="ml-2 px-3 py-2 text-sm font-medium text-soil-light hover:text-alert transition-colors"
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  )
}
