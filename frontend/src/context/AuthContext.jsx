/**
 * context/AuthContext.jsx
 *
 * Provides authentication state to all portals.
 * Consumed via the useAuth() hook (hooks/useAuth.js).
 *
 * State shape:
 *   user:            { id, username, role, name, agency? } | null
 *   token:           string | null
 *   role:            'analyst' | 'authority' | 'responder' | 'admin' | null
 *   isAuthenticated: boolean
 *   isLoading:       boolean  (true only during initial token restore)
 *
 * Role → Portal mapping (canonical — do NOT change without telling all 3 frontend devs):
 *   analyst   → /ntro
 *   authority → /government
 *   responder → /responder
 *   admin     → /ntro (full access)
 */

import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { login as svcLogin, logout as svcLogout, getStoredUser, getToken } from '../services/authService'
import { getHomeRoute } from '../utils/roles'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,      setUser]      = useState(null)
  const [token,     setToken]     = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // ── Restore from localStorage on mount ──────────────────────────────────
  useEffect(() => {
    const storedToken = getToken()
    const storedUser  = getStoredUser()

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(storedUser)
    }
    setIsLoading(false)
  }, [])

  // ── Login ────────────────────────────────────────────────────────────────
  const login = useCallback(async (username, password) => {
    const result = await svcLogin(username, password)
    setToken(result.token)
    setUser(result.user)
    return result
  }, [])

  // ── Logout ───────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    svcLogout()
    setToken(null)
    setUser(null)
  }, [])

  // ── Memoized context value ────────────────────────────────────────────────
  const value = useMemo(() => ({
    user,
    token,
    role:            user?.role ?? null,
    isAuthenticated: Boolean(token && user),
    isLoading,
    homeRoute:       user ? getHomeRoute(user.role) : '/login',
    login,
    logout,
  }), [user, token, isLoading, login, logout])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
