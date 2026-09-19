/**
 * components/common/LoadingState.jsx
 * components/common/ErrorState.jsx
 * components/common/EmptyState.jsx
 *
 * Three standard states used across all portals.
 * All states share the same visual language (dark bg, thermal orange accent).
 */

import { clsx } from '../../utils/classNames'
import { Icon } from './Icon'

// ── LoadingState ─────────────────────────────────────────────────────────────
/**
 * Props:
 *   message:    string   (default: 'Loading…')
 *   fullScreen: boolean  — fills the viewport (default: false)
 *   size:       'sm' | 'md' | 'lg' (default: 'md')
 *
 * Usage:
 *   <LoadingState message="Fetching satellite data…" />
 *   <LoadingState fullScreen />
 */
export function LoadingState({ message = 'Loading…', fullScreen = false, size = 'md' }) {
  const spinnerSize = { sm: 24, md: 36, lg: 48 }[size] ?? 36
  const textClass   = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }[size] ?? 'text-sm'

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-3',
        fullScreen
          ? 'fixed inset-0 bg-surface-bg z-50'
          : 'min-h-[160px] w-full'
      )}
    >
      {/* Thermal spinner */}
      <div className="relative" style={{ width: spinnerSize, height: spinnerSize }}>
        {/* Outer ring */}
        <svg
          className="animate-spin"
          width={spinnerSize}
          height={spinnerSize}
          viewBox="0 0 48 48"
        >
          <circle cx="24" cy="24" r="20" fill="none" stroke="#1f2937" strokeWidth="4" />
          <circle
            cx="24" cy="24" r="20"
            fill="none"
            stroke="#f97316"
            strokeWidth="4"
            strokeDasharray="82 44"
            strokeLinecap="round"
          />
        </svg>
        {/* Center fire icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name="fire" size={spinnerSize * 0.35} className="text-orange-400" />
        </div>
      </div>

      <div className="text-center space-y-1">
        <p className={clsx('text-gray-300 font-mono font-medium', textClass)}>{message}</p>
        <p className="text-xs text-gray-600 font-mono">SIH26162 · NTRO FireSense</p>
      </div>
    </div>
  )
}

// ── ErrorState ───────────────────────────────────────────────────────────────
/**
 * Props:
 *   message:    string   — human-readable error description
 *   detail:     string   — technical detail (optional, shown in mono)
 *   retry:      function — if provided, shows a "Retry" button
 *   fullScreen: boolean  (default: false)
 *
 * Usage:
 *   <ErrorState message="Failed to load incidents" retry={fetchIncidents} />
 */
export function ErrorState({ message = 'Something went wrong', detail, retry, fullScreen = false }) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-4 text-center',
        fullScreen ? 'fixed inset-0 bg-surface-bg z-50' : 'min-h-[160px] w-full px-6'
      )}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
        <Icon name="alert" size={22} className="text-red-400" />
      </div>

      <div className="space-y-1">
        <p className="text-gray-200 font-semibold">{message}</p>
        {detail && (
          <p className="text-xs text-gray-500 font-mono bg-gray-800/60 px-3 py-1.5 rounded max-w-sm break-all">
            {detail}
          </p>
        )}
      </div>

      {retry && (
        <button
          onClick={retry}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/40 rounded-lg text-sm font-mono transition-colors"
        >
          <Icon name="zap" size={14} />
          Retry
        </button>
      )}
    </div>
  )
}

// ── EmptyState ───────────────────────────────────────────────────────────────
/**
 * Props:
 *   message:    string   (default: 'No data available')
 *   icon:       string   — icon name from Icon component (default: 'activity')
 *   action:     { label: string, onClick: fn } — optional CTA
 *
 * Usage:
 *   <EmptyState message="No active incidents" icon="shield" />
 *   <EmptyState message="No alerts found" action={{ label: 'Refresh', onClick: fn }} />
 */
export function EmptyState({ message = 'No data available', icon = 'activity', action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-[160px] w-full text-center px-6">
      <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
        <Icon name={icon} size={22} className="text-gray-500" />
      </div>
      <p className="text-gray-400 text-sm font-mono">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="text-xs text-orange-400 hover:text-orange-300 font-mono underline underline-offset-2 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
