import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { ROLES } from './context/AuthContext.jsx'
import RoleSelect from './pages/RoleSelect.jsx'
import AuthPage from './pages/AuthPage.jsx'
import FarmerDashboard from './pages/FarmerDashboard.jsx'
import Marketplace from './pages/Marketplace.jsx'
import OrderTracking from './pages/OrderTracking.jsx'

function AppLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelect />} />

      <Route path="/farmer/login" element={<AuthPage role={ROLES.FARMER} mode="login" />} />
      <Route path="/farmer/register" element={<AuthPage role={ROLES.FARMER} mode="register" />} />
      <Route path="/buyer/login" element={<AuthPage role={ROLES.BUYER} mode="login" />} />
      <Route path="/buyer/register" element={<AuthPage role={ROLES.BUYER} mode="register" />} />

      {/* Farmer section — buyers are redirected out by ProtectedRoute */}
      <Route
        path="/farmer"
        element={
          <ProtectedRoute role={ROLES.FARMER}>
            <AppLayout>
              <FarmerDashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Buyer section — farmers are redirected out; marketplace is
          buyer-only, keeping the two sections properly separate. */}
      <Route
        path="/marketplace"
        element={
          <ProtectedRoute role={ROLES.BUYER}>
            <AppLayout>
              <Marketplace />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Orders — shared by both roles (farmers track incoming orders,
          buyers track what they've placed), so no role restriction here. */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <AppLayout>
              <OrderTracking />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/:orderId"
        element={
          <ProtectedRoute>
            <AppLayout>
              <OrderTracking />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback — anything unmatched goes to the role picker */}
      <Route path="*" element={<RoleSelect />} />
    </Routes>
  )
}
