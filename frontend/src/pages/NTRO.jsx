/**
 * pages/NTRO.jsx
 *
 * NTRO Analyst Spaceborne Tactical Console
 * --------------------------------------------------------------------------
 * OWNED BY: Pallabi (NTRO Team Lead)
 * All custom components for spatial tiles, FRP analytics, and evidence panels
 * will be placed in src/components/ntro/ and src/components/map/
 * --------------------------------------------------------------------------
 */

import React, { useState, useEffect } from 'react'
import { LayoutShell, SeverityBadge, ConfidenceDetection, ConfidenceClassification, PriorityScore, StatusPill, IncidentLogTimeline, LoadingState, Icon } from '../components/common'
import { getIncidents } from '../services/incidentService'

export function NTRO() {
  const [incidents, setIncidents] = useState([])
  const [selectedIncident, setSelectedIncident] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getIncidents()
        setIncidents(data)
        if (data.length > 0) setSelectedIncident(data[0])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <LayoutShell portalTitle="NTRO Spaceborne Tactical Console" badge="TOP SECRET // COMINT">
      <div className="space-y-6">
        {/* Page Subheader */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-4">
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <Icon name="satellite" size={20} className="text-orange-400" />
              Real-Time Spaceborne Thermal Anomaly Feed
            </h1>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              NASA FIRMS VIIRS 375m & MODIS 1km Ingestion Pipeline • Automated Classification Engine
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-400 bg-surface-panel px-3 py-1.5 rounded-lg border border-surface-border flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              HOTSPOTS DETECTED: <strong className="text-white">{incidents.length}</strong>
            </span>
          </div>
        </div>

        {/* Foundation Demo Showcase / Workspace */}
        {loading ? (
          <LoadingState message="Connecting to satellite orbital downlink..." />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Incident Selector list */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                Telemetry Queue (Click to Inspect)
              </div>
              <div className="space-y-2">
                {incidents.map((inc) => {
                  const active = selectedIncident?.id === inc.id
                  return (
                    <button
                      key={inc.id}
                      onClick={() => setSelectedIncident(inc)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        active
                          ? 'bg-orange-500/15 border-orange-500/50 shadow-lg'
                          : 'bg-surface-panel border-surface-border hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="font-mono text-xs font-bold text-gray-200">{inc.id}</span>
                        <SeverityBadge level={inc.risk_label?.split(' ')[0] || 'LOW'} size="sm" />
                      </div>
                      <div className="text-xs font-semibold text-white truncate">{inc.title}</div>
                      <div className="text-[11px] text-gray-400 font-mono truncate mt-0.5">{inc.location_name}</div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-800/80 text-[10px] font-mono text-gray-400">
                        <span>FRP: {inc.frp_mw} MW</span>
                        <StatusPill status={inc.status} size="sm" />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Middle & Right: Deep Dossier & Design System Inspector */}
            {selectedIncident && (
              <div className="lg:col-span-2 space-y-6">
                {/* Tactical Header Card */}
                <div className="bg-surface-panel border border-surface-border rounded-xl p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-orange-400 font-bold">{selectedIncident.id}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs font-mono text-gray-400">{selectedIncident.timestamp}</span>
                      </div>
                      <h2 className="text-base font-bold text-white mt-1">{selectedIncident.title}</h2>
                      <p className="text-xs text-gray-400 mt-0.5">{selectedIncident.location_name}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <PriorityScore score={selectedIncident.risk_score} size="sm" />
                    </div>
                  </div>

                  {/* Core Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-gray-800">
                    <div className="p-2.5 rounded-lg bg-surface-bg border border-gray-800">
                      <div className="text-[10px] font-mono text-gray-500 uppercase">Fire Radiative Power</div>
                      <div className="text-sm font-mono font-bold text-orange-400 mt-0.5">{selectedIncident.frp_mw} MW</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-bg border border-gray-800">
                      <div className="text-[10px] font-mono text-gray-500 uppercase">Brightness Temp</div>
                      <div className="text-sm font-mono font-bold text-amber-300 mt-0.5">{selectedIncident.brightness_c}°C</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-bg border border-gray-800">
                      <div className="text-[10px] font-mono text-gray-500 uppercase">Classification</div>
                      <div className="text-xs font-mono font-bold text-white mt-1 truncate">{selectedIncident.classification}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-bg border border-gray-800">
                      <div className="text-[10px] font-mono text-gray-500 uppercase">Lifecycle Status</div>
                      <div className="mt-1"><StatusPill status={selectedIncident.status} size="sm" /></div>
                    </div>
                  </div>
                </div>

                {/* Dual Confidence Displays (Detection vs Classification) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface-panel border border-surface-border rounded-xl p-4">
                    <ConfidenceDetection
                      score={selectedIncident.confidence}
                      rating={selectedIncident.confidence_breakdown?.rating}
                      breakdown={selectedIncident.confidence_breakdown}
                    />
                  </div>

                  <div className="bg-surface-panel border border-surface-border rounded-xl p-4">
                    <ConfidenceClassification
                      score={selectedIncident.confidence / 100}
                      classification={selectedIncident.classification}
                    />
                  </div>
                </div>

                {/* State Transition Timeline */}
                <div className="bg-surface-panel border border-surface-border rounded-xl p-5 space-y-3">
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Icon name="clock" size={14} className="text-orange-400" />
                    Incident State & Audit Log
                  </h3>
                  <IncidentLogTimeline logs={selectedIncident.incident_logs || []} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </LayoutShell>
  )
}
