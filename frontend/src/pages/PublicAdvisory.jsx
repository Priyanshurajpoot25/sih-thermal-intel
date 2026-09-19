/**
 * pages/PublicAdvisory.jsx
 *
 * Lightweight, isolated public bulletin and safety portal.
 * - No authentication required.
 * - Read-only /public/alerts consumption (with mock fallbacks).
 * - High-accessibility safety guidance, nearest shelter lookup, emergency helplines.
 * - Isolated so zero exceptions can ever propagate to break internal command consoles.
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPublicAlerts } from '../services/incidentService'
import { MOCK_SHELTERS, GENERAL_SAFETY_TIPS } from '../fixtures/publicAlerts.mock'
import { SeverityBadge, Icon, LoadingState, ErrorState } from '../components/common'

export function PublicAdvisory() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedShelterDist, setSelectedShelterDist] = useState('ALL')

  useEffect(() => {
    let mounted = true
    const fetchAlerts = async () => {
      try {
        setLoading(true)
        const data = await getPublicAlerts()
        if (mounted) {
          setAlerts(data)
          setError(null)
        }
      } catch (err) {
        if (mounted) setError(err.message || 'Unable to fetch public advisories.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchAlerts()
    return () => { mounted = false }
  }, [])

  const filteredShelters = selectedShelterDist === 'ALL'
    ? MOCK_SHELTERS
    : MOCK_SHELTERS.filter(s => s.district.toLowerCase().includes(selectedShelterDist.toLowerCase()))

  return (
    <div className="min-h-screen bg-surface-bg text-gray-100 flex flex-col font-sans">
      {/* Public Header */}
      <header className="bg-surface-panel border-b border-surface-border px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
            <Icon name="shield" size={20} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              CITIZEN THERMAL SAFETY ADVISORY
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                PUBLIC FEED
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">National Disaster Management & Spaceborne Warning Bureau</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono bg-red-950/40 border border-red-800/50 text-red-300 px-3 py-1 rounded-lg">
            <Icon name="phone" size={14} />
            <span>DISASTER HELPLINE: 112</span>
          </div>

          <Link
            to="/login"
            className="text-xs font-mono text-gray-400 hover:text-orange-400 border border-gray-700 hover:border-orange-500/40 px-3 py-1.5 rounded-lg transition-colors"
          >
            Agency Login →
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* Emergency Broadcast Banner */}
        <div className="bg-gradient-to-r from-red-950/70 via-orange-950/40 to-surface-panel border border-red-900/60 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-600/20 text-red-400 shrink-0 mt-0.5">
              <Icon name="alert" size={22} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Active Air & Wildfire Monitoring Across Zones</h2>
              <p className="text-xs text-gray-300 mt-1 max-w-2xl">
                Thermal infrared satellite sensors detect temperature anomalies over forest and agricultural zones.
                Follow issued shelter and air filtration guidance below if within affected perimeters.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <a
              href="tel:112"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Icon name="phone" size={14} />
              CALL 112
            </a>
          </div>
        </div>

        {/* Dynamic Alert Feeds Grid */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Icon name="activity" size={14} className="text-orange-400" />
              Active Public Bulletins ({alerts.length})
            </h2>
            <span className="text-[11px] font-mono text-gray-500">Auto-refreshed via NASA FIRMS telemetry</span>
          </div>

          {loading ? (
            <LoadingState message="Connecting to public alert network..." />
          ) : error ? (
            <ErrorState message={error} />
          ) : alerts.length === 0 ? (
            <div className="bg-surface-panel border border-surface-border rounded-xl p-8 text-center text-gray-400 text-xs font-mono">
              No active public safety alerts in your vicinity.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-surface-panel border border-surface-border hover:border-gray-700 rounded-xl p-4 flex flex-col justify-between transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <SeverityBadge level={alert.severity} size="sm" pulse />
                      <span className="text-[10px] font-mono text-gray-400">
                        {new Date(alert.issued_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white leading-snug">{alert.title}</h3>
                      <p className="text-xs text-orange-400/90 font-mono mt-0.5">{alert.affected_area}</p>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed">{alert.summary}</p>

                    {alert.guidance && alert.guidance.length > 0 && (
                      <div className="bg-black/30 border border-gray-800 rounded-lg p-2.5 space-y-1">
                        <div className="text-[10px] font-mono text-gray-400 uppercase font-bold">Safety Instructions:</div>
                        <ul className="text-[11px] text-gray-300 space-y-1 list-disc list-inside">
                          {alert.guidance.slice(0, 3).map((g, idx) => (
                            <li key={idx} className="leading-tight">{g}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {alert.nearest_shelter && (
                    <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-xs font-mono text-gray-400">
                      <span className="flex items-center gap-1">
                        <Icon name="location" size={14} className="text-emerald-400" />
                        Shelter: {alert.nearest_shelter.distance_km}km
                      </span>
                      <span className="text-emerald-400 font-bold">{alert.nearest_shelter.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Shelters & Safety Info Dual Column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Nearest Emergency Shelters (2 Cols) */}
          <div className="lg:col-span-2 bg-surface-panel border border-surface-border rounded-xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Icon name="building" size={16} className="text-orange-400" />
                Designated Civilian Relief Shelters
              </h3>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-gray-500">Filter Region:</span>
                <select
                  value={selectedShelterDist}
                  onChange={(e) => setSelectedShelterDist(e.target.value)}
                  className="bg-surface-bg border border-gray-800 rounded px-2 py-1 text-gray-200 focus:outline-none focus:border-orange-500 text-xs"
                >
                  <option value="ALL">All Districts</option>
                  <option value="Mayurbhanj">Mayurbhanj (Odisha)</option>
                  <option value="Sangrur">Sangrur (Punjab)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2.5">
              {filteredShelters.map((shelter) => (
                <div
                  key={shelter.id}
                  className="p-3.5 rounded-lg bg-surface-bg border border-gray-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-200">{shelter.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                        {shelter.status}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-gray-400">{shelter.district}</div>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {shelter.facilities.map((f, i) => (
                        <span key={i} className="text-[10px] font-mono bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right sm:self-center shrink-0">
                    <div className="text-xs font-mono text-gray-400">Capacity: {shelter.capacity}</div>
                    <a
                      href={`tel:${shelter.contact}`}
                      className="text-xs font-mono text-orange-400 hover:underline mt-1 inline-block"
                    >
                      {shelter.contact}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Protocols Column */}
          <div className="bg-surface-panel border border-surface-border rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Icon name="info" size={16} className="text-orange-400" />
              Standard Fire & Smoke Protocols
            </h3>

            <div className="space-y-3">
              {GENERAL_SAFETY_TIPS.map((tip, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-surface-bg border border-gray-800/80 flex items-start gap-3">
                  <div className="p-1.5 rounded bg-orange-500/10 text-orange-400 shrink-0 mt-0.5">
                    <Icon name={tip.icon || 'shield'} size={14} />
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
