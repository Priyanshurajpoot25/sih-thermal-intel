/**
 * pages/Government.jsx
 *
 * Government / Disaster Management Authority Portal
 * --------------------------------------------------------------------------
 * OWNED BY: Adil (Government Portal Lead)
 * All municipal coordination, automated Common Alerting Protocol (CAP) dispatches,
 * and evacuation perimeter controls live in src/components/government/
 * --------------------------------------------------------------------------
 */

import React, { useState, useEffect } from 'react'
import { LayoutShell, SeverityBadge, PriorityScore, StatusPill, IncidentLogTimeline, LoadingState, Icon } from '../components/common'
import { getIncidents, dispatch } from '../services/incidentService'

export function Government() {
  const [incidents, setIncidents] = useState([])
  const [loading, setLoading] = useState(true)
  const [dispatchingId, setDispatchingId] = useState(null)
  const [dispatchLog, setDispatchLog] = useState(null)

  const loadData = async () => {
    try {
      const data = await getIncidents()
      setIncidents(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDispatch = async (incId) => {
    setDispatchingId(incId)
    try {
      const res = await dispatch(incId)
      setDispatchLog(res)
      await loadData()
    } finally {
      setDispatchingId(null)
    }
  }

  return (
    <LayoutShell portalTitle="State Emergency Operations Center" badge="RESTRICTED // AUTHORITY">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-4">
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <Icon name="building" size={20} className="text-orange-400" />
              Emergency Response & Civil Protection Command
            </h1>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              Authority Escalation • Automated Common Alerting Protocol (CAP) Transmission • Resource Allocation
            </p>
          </div>
        </div>

        {dispatchLog && (
          <div className="p-4 rounded-xl bg-orange-950/40 border border-orange-600/50 text-orange-200 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Icon name="dispatch" size={18} className="text-orange-400" />
              <span>
                <strong>DISPATCH CONFIRMED:</strong> Transmitted encrypted emergency order to <strong>{dispatchLog.dispatched_to}</strong> (ETA: {dispatchLog.eta})
              </span>
            </div>
            <button onClick={() => setDispatchLog(null)} className="text-gray-400 hover:text-white">
              <Icon name="close" size={14} />
            </button>
          </div>
        )}

        {loading ? (
          <LoadingState message="Loading civil jurisdiction data..." />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {incidents.map((inc) => (
              <div key={inc.id} className="bg-surface-panel border border-surface-border rounded-xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono text-orange-400 font-bold">{inc.id}</span>
                      <h2 className="text-base font-bold text-white mt-0.5">{inc.title}</h2>
                      <p className="text-xs text-gray-400 mt-0.5">{inc.location_name}</p>
                    </div>
                    <SeverityBadge level={inc.risk_label?.split(' ')[0] || 'LOW'} size="sm" pulse />
                  </div>

                  <div className="flex items-center justify-between bg-surface-bg p-3 rounded-lg border border-gray-800">
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase">Assigned Authority</div>
                      <div className="text-xs font-bold text-gray-200 mt-0.5">{inc.assigned_authority?.name || 'Local District HQ'}</div>
                      <div className="text-[11px] font-mono text-orange-400">ETA: {inc.assigned_authority?.eta_mins || 20} mins</div>
                    </div>
                    <PriorityScore score={inc.risk_score} compact />
                  </div>

                  {inc.assets_at_risk && (
                    <div>
                      <div className="text-[11px] font-mono text-gray-400 mb-1.5 uppercase font-semibold">
                        Assets Within Blast & Smoke Radius:
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {inc.assets_at_risk.slice(0, 2).map((asset, i) => (
                          <div key={i} className="p-2 rounded bg-gray-900/60 border border-gray-800 text-xs">
                            <div className="text-gray-200 font-medium truncate">{asset.asset}</div>
                            <div className="text-[10px] font-mono text-gray-500">{asset.population} • {asset.distance_km}km</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-800 flex items-center justify-between gap-3">
                  <StatusPill status={inc.status} />

                  {inc.status !== 'DISPATCHED' && inc.status !== 'RESOLVED' && (
                    <button
                      onClick={() => handleDispatch(inc.id)}
                      disabled={dispatchingId === inc.id}
                      className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      <Icon name="dispatch" size={14} />
                      {dispatchingId === inc.id ? 'TRANSMITTING...' : 'AUTHORIZE DISPATCH'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </LayoutShell>
  )
}
