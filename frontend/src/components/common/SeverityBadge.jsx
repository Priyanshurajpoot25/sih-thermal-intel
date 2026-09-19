/**
 * components/common/SeverityBadge.jsx
 *
 * Color-coded severity indicator. Strong visual hierarchy — each level is
 * visually distinct so operators can identify criticality at a glance.
 *
 * Props:
 *   level:   'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE' | 'LOW' | 'SAFE'
 *   size:    'sm' | 'md' | 'lg'  (default: 'md')
 *   pulse:   boolean  — animate dot for CRITICAL/HIGH (default: false)
 *   className: string
 *
 * Usage:
 *   <SeverityBadge level="CRITICAL" pulse />
 *   <SeverityBadge level="LOW" size="sm" />
 */

import { clsx } from '../../utils/classNames'
import { SEVERITY_COLOR } from '../../styles/theme'

const SIZE = {
  sm: { badge: 'text-xs px-1.5 py-0.5 gap-1',   dot: 'w-1.5 h-1.5' },
  md: { badge: 'text-xs px-2.5 py-1   gap-1.5',  dot: 'w-2   h-2'   },
  lg: { badge: 'text-sm px-3   py-1.5 gap-2',    dot: 'w-2.5 h-2.5' },
}

export function SeverityBadge({ level = 'LOW', size = 'md', pulse = false, className }) {
  const normalized = (level ?? 'LOW').toUpperCase()
  const colors = SEVERITY_COLOR[normalized] ?? SEVERITY_COLOR.LOW
  const sz = SIZE[size] ?? SIZE.md

  const isPulsing = pulse && (normalized === 'CRITICAL' || normalized === 'HIGH')

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-mono font-semibold tracking-wider border',
        colors.bg, colors.text, colors.border,
        sz.badge,
        className
      )}
    >
      {/* Status dot */}
      <span className="relative flex-shrink-0">
        <span className={clsx('rounded-full block', colors.dot, sz.dot)} />
        {isPulsing && (
          <span
            className={clsx(
              'absolute inset-0 rounded-full animate-ping opacity-75',
              colors.dot
            )}
          />
        )}
      </span>
      {normalized}
    </span>
  )
}

// ── Convenience variant — just the dot, no label ─────────────────────────────
export function SeverityDot({ level = 'LOW', pulse = false, className }) {
  const normalized = (level ?? 'LOW').toUpperCase()
  const colors = SEVERITY_COLOR[normalized] ?? SEVERITY_COLOR.LOW

  return (
    <span className={clsx('relative inline-flex', className)}>
      <span className={clsx('w-2.5 h-2.5 rounded-full block', colors.dot)} />
      {pulse && (normalized === 'CRITICAL' || normalized === 'HIGH') && (
        <span className={clsx('absolute inset-0 rounded-full animate-ping opacity-75', colors.dot)} />
      )}
    </span>
  )
}
