/**
 * components/common/StatusPill.jsx
 *
 * Incident lifecycle state pill.
 * States (in order): NEW → INVESTIGATING → VERIFIED → DISPATCHED → CONTAINED → RESOLVED
 *
 * Props:
 *   status:   'NEW' | 'INVESTIGATING' | 'VERIFIED' | 'DISPATCHED' | 'CONTAINED' | 'RESOLVED'
 *   size:     'sm' | 'md'  (default: 'md')
 *   showStep: boolean  — show step number (e.g. "2/6") (default: false)
 *
 * Usage:
 *   <StatusPill status="DISPATCHED" />
 *   <StatusPill status="NEW" showStep size="sm" />
 */

import { clsx } from '../../utils/classNames'
import { STATUS_COLOR, STATUS_ORDER } from '../../styles/theme'

const STATUS_ICON = {
  NEW:           '◎',
  INVESTIGATING: '◐',
  VERIFIED:      '●',
  DISPATCHED:    '►',
  CONTAINED:     '◉',
  RESOLVED:      '✓',
}

export function StatusPill({ status = 'NEW', size = 'md', showStep = false }) {
  const normalized = (status ?? 'NEW').toUpperCase()
  const colors = STATUS_COLOR[normalized] ?? STATUS_COLOR.NEW
  const stepIdx = STATUS_ORDER.indexOf(normalized)

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full font-mono font-semibold border',
        colors.bg, colors.text, colors.border,
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-3 py-1'
      )}
    >
      {/* Animated dot */}
      <span className="relative flex-shrink-0">
        <span className={clsx('w-1.5 h-1.5 rounded-full block', colors.dot)} />
        {normalized === 'NEW' && (
          <span className={clsx('absolute inset-0 rounded-full animate-ping opacity-60', colors.dot)} />
        )}
      </span>

      {/* Icon + label */}
      <span className="leading-none">
        {STATUS_ICON[normalized]} {normalized}
      </span>

      {/* Step counter */}
      {showStep && stepIdx >= 0 && (
        <span className="text-xs opacity-50 ml-1">
          {stepIdx + 1}/{STATUS_ORDER.length}
        </span>
      )}
    </span>
  )
}

// ── Status progress bar — shows full lifecycle ────────────────────────────────
export function StatusProgressBar({ status }) {
  const normalized = (status ?? 'NEW').toUpperCase()
  const currentIdx = STATUS_ORDER.indexOf(normalized)

  return (
    <div className="flex items-center gap-1">
      {STATUS_ORDER.map((s, idx) => {
        const done    = idx <= currentIdx
        const current = idx === currentIdx
        const colors  = STATUS_COLOR[s]

        return (
          <div key={s} className="flex items-center gap-1 flex-1">
            <div
              className={clsx(
                'h-1.5 flex-1 rounded-full transition-all duration-300',
                done ? colors.dot : 'bg-gray-700'
              )}
            />
            {idx < STATUS_ORDER.length - 1 && (
              <div className={clsx('w-1 h-1 rounded-full', done ? 'bg-gray-400' : 'bg-gray-700')} />
            )}
          </div>
        )
      })}
    </div>
  )
}
