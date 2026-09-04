import { createContext, useContext, useState, useCallback } from 'react'

// ASSUMPTION — check this against docs/api-contracts.md once real auth is
// wired up: role values here are 'farmer' | 'buyer', and the demo user
// object is { name, phone, role }. If the contract's user shape differs
// (extra fields, different role names), update ROLES and the object shape
// below, plus AuthPage.jsx which builds it.
export const ROLES = {
  FARMER: 'farmer',
  BUYER: 'buyer',
}

const AuthContext = createContext(null)

const STORAGE_KEY = 'agriconnect.user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  })

  // Demo-only: no backend call yet. Accepts a full user object on
  // register ({ name, phone, role }), or just { phone, role } on login
  // since we don't have a real account store to look the name up in.
  const login = useCallback((nextUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, role: user?.role ?? null, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
