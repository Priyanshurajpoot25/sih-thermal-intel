/**
 * components/common/LayoutShell.jsx
 *
 * Master layout shell wrapping all protected portals (NTRO, Government, Responder).
 * Provides:
 * - Persistent Topbar with active agency clearance, live clock, user badge, logout
 * - Role-aware Sidebar navigation (with canonical portal switching for admin)
 * - Breadcrumbs and Portal header
 * - Automatic DemoDataBadge overlay when in mock mode
 *
 * Props:
 *   portalTitle:  string   e.g. "NTRO Spaceborne Command Console"
 *   badge:        string   e.g. "TOP SECRET // COMINT"
 *   children:     ReactNode
 */

import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Icon } from './Icon'
import { DemoDataBadge } from './DemoDataBadge'
import { ROLE_LABEL } from '../../styles/theme'

export function LayoutShell({ portalTitle, badge, children }) {
  const { user, role, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeStr(
        now.toLocaleTimeString('en-IN', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Kolkata',
        }) + ' IST'
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const navItems = [
    { label: 'NTRO Console', path: '/ntro', icon: 'satellite', roles: ['analyst', 'admin'] },
    { label: 'Govt Authority', path: '/government', icon: 'building', roles: ['authority', 'admin'] },
    { label: 'Field Responder', path: '/responder', icon: 'dispatch', roles: ['responder', 'admin'] },
    { label: 'Public Advisory', path: '/advisory', icon: 'shield', roles: ['analyst', 'authority', 'responder', 'admin'] },
  ]

  const visibleNav = navItems.filter((item) => item.roles.includes(role || ''))

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-surface-bg text-gray-100 flex flex-col font-sans">
      <DemoDataBadge position="top-right" />

      {/* Top Header */}
      <header className="h-14 bg-surface-panel border-b border-surface-border px-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400 group-hover:bg-orange-600/30 transition-colors">
              <Icon name="fire" size={18} />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold tracking-wider text-sm text-white flex items-center gap-1.5">
                FIRESENSE <span className="text-[10px] text-orange-400 font-normal">SIH26162</span>
              </span>
              <span className="text-[10px] text-gray-400 tracking-tight">Spaceborne Thermal Intel</span>
            </div>
          </Link>

          <div className="h-4 w-px bg-gray-800 mx-1 hidden sm:block" />

          {portalTitle && (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-300">{portalTitle}</span>
              {badge && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-800/50">
                  {badge}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right Header Status / User Profile */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-400 bg-black/40 px-2.5 py-1 rounded border border-gray-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SAT OVERPASS: {timeStr || 'LIVE'}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-medium text-gray-200">{user?.name || 'Operator'}</div>
              <div className="text-[10px] font-mono text-orange-400">
                {ROLE_LABEL[role] || role || 'Authorized'}
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg bg-gray-800/80 hover:bg-red-950/40 text-gray-400 hover:text-red-300 border border-gray-700 hover:border-red-800/50 transition-colors"
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main App Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-16 md:w-56 bg-surface-panel/80 border-r border-surface-border flex flex-col justify-between p-2 md:p-3 shrink-0">
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-mono text-gray-500 uppercase tracking-widest hidden md:block">
              Portals & Feeds
            </div>
            {visibleNav.map((item) => {
              const active = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30 shadow-sm'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="p-2 border-t border-gray-800 hidden md:block text-[11px] font-mono text-gray-500">
            <div className="text-gray-400 font-semibold mb-0.5">NTRO // FIRMS VIIRS</div>
            <div>Spatial Res: 375m</div>
            <div>Temp Range: 60-600°C</div>
          </div>
        </aside>

        {/* Dynamic Portal Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-surface-bg p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
