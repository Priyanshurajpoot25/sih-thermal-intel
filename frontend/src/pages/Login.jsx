/**
 * pages/Login.jsx
 *
 * Dedicated login portal with demo account quick-fill buttons.
 * Supports canonical role routing:
 *   analyst   -> /ntro
 *   authority -> /government
 *   responder -> /responder
 *   admin     -> /ntro (unrestricted)
 */

import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getHomeRoute } from '../utils/roles'
import { Icon, DemoDataBadge } from '../components/common'
import { MOCK_USERS } from '../fixtures/auth.mock'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e?.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await login(username, password)
      const redirectPath = location.state?.from?.pathname || getHomeRoute(res.user.role)
      navigate(redirectPath, { replace: true })
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  const fillDemoAccount = (acc) => {
    setUsername(acc.username)
    setPassword(acc.password)
    setError('')
  }

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      <DemoDataBadge position="top-right" />

      {/* Ambient background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/30 text-orange-400 mb-4 shadow-lg shadow-orange-500/5">
            <Icon name="fire" size={30} />
          </div>
          <h1 className="text-2xl font-bold font-mono tracking-wider text-white">
            FIRESENSE INTEL
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            SIH26162 NTRO Spaceborne Tactical Dispatch
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-surface-panel border border-surface-border rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-200">Authorized Agency Sign-In</h2>
            <p className="text-xs text-gray-500 mt-0.5">Select a role below or enter encrypted credentials</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
              <Icon name="alert" size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1.5">OPERATOR ID / EMAIL</label>
              <input
                type="email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="analyst@ntro.gov.in"
                className="w-full bg-surface-bg border border-gray-800 rounded-lg px-3.5 py-2.5 text-xs text-gray-200 placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1.5">AUTHENTICATION KEY</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-bg border border-gray-800 rounded-lg px-3.5 py-2.5 text-xs text-gray-200 placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-mono text-xs font-semibold py-3 rounded-lg shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>AUTHENTICATING TELEMETRY...</span>
              ) : (
                <>
                  <span>AUTHENTICATE & ACCESS</span>
                  <Icon name="chevron-right" size={14} />
                </>
              )}
            </button>
          </form>

          {/* Quick-Fill Demo Profiles */}
          <div className="mt-8 pt-6 border-t border-gray-800/80">
            <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-3 text-center">
              Quick Role Switch (Demo Mode)
            </div>
            <div className="grid grid-cols-2 gap-2">
              {MOCK_USERS.map((u) => (
                <button
                  key={u.role}
                  type="button"
                  onClick={() => fillDemoAccount(u)}
                  className="flex flex-col items-start p-2.5 rounded-lg bg-gray-900/60 hover:bg-gray-800/80 border border-gray-800 hover:border-gray-700 text-left transition-all group"
                >
                  <span className="text-[11px] font-bold text-gray-200 group-hover:text-orange-400 transition-colors">
                    {u.role.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-gray-400 truncate w-full">{u.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Public Advisory Link */}
        <div className="mt-6 text-center">
          <a
            href="/advisory"
            className="text-xs font-mono text-gray-400 hover:text-orange-400 transition-colors inline-flex items-center gap-1.5"
          >
            <Icon name="shield" size={14} />
            <span>Looking for public alerts? Access Citizen Advisory (No Login)</span>
          </a>
        </div>
      </div>
    </div>
  )
}
