/**
 * pages/Responder.jsx
 *
 * First Responder Mobile Field Terminal
 * --------------------------------------------------------------------------
 * OWNED BY: Adil (Responder Interface Lead)
 * Workflow state stepper: ACKNOWLEDGE -> EN ROUTE -> ARRIVED -> CONTAINED -> RESOLVED
 * Lives in src/components/responder/
 * --------------------------------------------------------------------------
 */

import React, { useState, useEffect } from 'react'
import { LayoutShell, SeverityBadge, StatusPill, LoadingState, Icon } from '../components/common'
import { getIncidents, updateStatus } from '../services/incidentService'

export function Responder() {
  const [incidents, setIncidents] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeIncident, setActiveIncident] = useState(null)
  const [updating, setUpdating] = useState(false)

  const loadData = async () => {
    try {
      const data = await getIncidents()
      setIncidents(data)
      if (data.length > 0 && !activeIncident) {
        setActiveIncident(data[0])
      } else if (activeIncident) {
        const found = data.find(i => i.id === activeIncident.id)
        if (found) setActiveIncident(found)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleAdvanceStatus = async (nextStatus) => {
    if (!activeIncident) return
    setUpdating(true)
    try {
      await updateStatus(activeIncident.id, nextStatus)
      await loadData()
    } finally {
      setUpdating(false)
    }
  }

  return (
    <LayoutShell portalTitle="First Responder Field Terminal" badge="FIELD // TACTICAL">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-4">
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <Icon name="dispatch" size={20} className="text-orange-400" />
              Mobile Responder Unit & Status Stepper
            </h1>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              Live Field Coordination • Ground Truth Feedback • Containment Logging
            </p>
          </div>
        </div>

        {loading ? (
          <LoadingState message="Connecting to field dispatch network..." />
        ) : activeIncident ? (
          <div className="space-y-6">
            {/* Active Ticket Hero */}
            <div className="bg-surface-panel border border-surface-border rounded-xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-orange-400">{activeIncident.id}</span>
                  <SeverityBadge level={activeIncident.risk_label?.split(' ')[0] || 'LOW'} size="sm" pulse />
                </div>
                <StatusPill status={activeIncident.status} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">{activeIncident.title}</h2>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{activeIncident.location_name}</p>
              </div>

              {/* Coordinates & Navigation Box */}
              <div className="p-3.5 rounded-lg bg-surface-bg border border-gray-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div>
                  <span className="text-gray-500">COORDINATES:</span>{' '}
                  <span className="text-gray-200">{activeIncident.coordinates.lat.toFixed(4)}°N, {activeIncident.coordinates.lon.toFixed(4)}°E</span>
                </div>
                <div>
                  <span className="text-gray-500">THERMAL FRP:</span>{' '}
                  <span className="text-orange-400 font-bold">{activeIncident.frp_mw} MW</span>
                </div>
              </div>

              {/* Responder Step Buttons */}
              <div className="pt-4 border-t border-gray-800 space-y-3">
                <div className="text-xs font-mono text-gray-400 uppercase font-semibold">
                  Field Lifecycle Transitions:
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={() => handleAdvanceStatus('INVESTIGATING')}
                    disabled={updating || activeIncident.status === 'INVESTIGATING'}
                    className="p-3 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-700/60 text-indigo-200 text-xs font-mono font-semibold transition-all disabled:opacity-40"
                  >
                    1. ACKNOWLEDGE
                  </button>

                  <button
                    onClick={() => handleAdvanceStatus('VERIFIED')}
                    disabled={updating || activeIncident.status === 'VERIFIED'}
                    className="p-3 rounded-lg bg-blue-950/60 hover:bg-blue-900/80 border border-blue-700/60 text-blue-200 text-xs font-mono font-semibold transition-all disabled:opacity-40"
                  >
                    2. EN ROUTE / VERIFY
                  </button>

                  <button
                    onClick={() => handleAdvanceStatus('CONTAINED')}
                    disabled={updating || activeIncident.status === 'CONTAINED'}
                    className="p-3 rounded-lg bg-yellow-950/60 hover:bg-yellow-900/80 border border-yellow-700/60 text-yellow-200 text-xs font-mono font-semibold transition-all disabled:opacity-40"
                  >
                    3. CONTAINED
                  </button>

                  <button
                    onClick={() => handleAdvanceStatus('RESOLVED')}
                    disabled={updating || activeIncident.status === 'RESOLVED'}
                    className="p-3 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 text-emerald-200 text-xs font-mono font-semibold transition-all disabled:opacity-40"
                  >
                    4. RESOLVED
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Ticket Switcher */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-gray-400 uppercase">Switch Active Field Ticket:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {incidents.map((inc) => (
                  <button
                    key={inc.id}
                    onClick={() => setActiveIncident(inc)}
                    className={`p-3 rounded-lg border text-left text-xs font-mono flex items-center justify-between ${
                      activeIncident.id === inc.id
                        ? 'bg-orange-500/15 border-orange-500/60 text-white'
                        : 'bg-surface-panel border-surface-border text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <span className="font-bold truncate">{inc.id}: {inc.title}</span>
                    <StatusPill status={inc.status} size="sm" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </LayoutShell>
  )
}
