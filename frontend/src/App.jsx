/**
 * App.jsx
 *
 * Root Application Router.
 * Configured with react-router-dom v6:
 *   /           -> Landing Page (public)
 *   /login      -> Login (public)
 *   /advisory   -> Public Citizen Advisory (public, isolated)
 *   /ntro       -> ProtectedRoute (analyst, admin) -> NTRO Console
 *   /government -> ProtectedRoute (authority, admin) -> Government Portal
 *   /responder  -> ProtectedRoute (responder, admin) -> Field Responder Terminal
 *   *           -> Redirect to /
 */

import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { PublicAdvisory } from './pages/PublicAdvisory'
import { NTRO } from './pages/NTRO'
import { Government } from './pages/Government'
import { Responder } from './pages/Responder'

export function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/advisory" element={<PublicAdvisory />} />

        {/* Role-Guarded Portals */}
        <Route
          path="/ntro"
          element={
            <ProtectedRoute allowedRoles={['analyst', 'admin']}>
              <NTRO />
            </ProtectedRoute>
          }
        />

        <Route
          path="/government"
          element={
            <ProtectedRoute allowedRoles={['authority', 'admin']}>
              <Government />
            </ProtectedRoute>
          }
        />

        <Route
          path="/responder"
          element={
            <ProtectedRoute allowedRoles={['responder', 'admin']}>
              <Responder />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
