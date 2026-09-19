/**
 * components/common/IncidentLogTimeline.jsx
 *
 * Audit trail & lifecycle timeline component.
 * Reused by both NTRO (analyst investigation) and Government (authority escalation).
 *
 * Props:
 *   logs: Array<{
 *     timestamp: string,
 *     status: string,
 *     actor?: string,
 *     note?: string
 *   }>
 *   compact?: boolean
 */

import React from 'react'
import { StatusPill } from './StatusPill'
import { Icon } from './Icon'

export function IncidentLogTimeline({ logs = [], compact = false }) {
  if (!logs || logs.length === 0) {
    return (
      <div className="text-xs font-mono text-gray-500 py-3 text-center border border-dashed border-gray-800 rounded-lg">
        No state transition logs recorded yet.
      </div>
    )
  }

  return (
    <div className={`relative pl-4 space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-800 ${compact ? 'text-xs' : 'text-sm'}`}>
      {logs.map((entry, idx) => (
        <div key={idx} className="relative flex items-start gap-3 group">
          {/* Timeline Node Point */}
          <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-surface-panel border-2 border-orange-500 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-orange-400" />
          </div>

          <div className="flex-1 bg-surface-panel/70 border border-surface-border rounded-lg p-3 hover:border-gray-700 transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <StatusPill status={entry.status} size="sm" />
                {entry.actor && (
                  <span className="text-xs font-mono text-gray-400 bg-gray-800/80 px-2 py-0.5 rounded border border-gray-700/60">
                    {entry.actor}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-gray-400">
                <Icon name="clock" size={12} className="text-gray-500" />
                <span>{entry.timestamp}</span>
              </div>
            </div>

            {entry.note && (
              <p className="text-xs text-gray-300 font-sans leading-relaxed mt-1">
                {entry.note}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
