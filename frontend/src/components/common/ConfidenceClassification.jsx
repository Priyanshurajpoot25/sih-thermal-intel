/**
 * components/common/ConfidenceClassification.jsx
 *
 * Shows AI CLASSIFICATION confidence — a 0–1 decimal value.
 *
 * IMPORTANT: This is CLASSIFICATION confidence (how sure is the model about
 * what TYPE of fire this is). Displayed as a decimal 0.00–1.00, NOT as a %.
 * This is intentionally different from ConfidenceDetection.
 *
 * The display uses a segmented scale (0.0 → 0.5 → 0.7 → 0.85 → 1.0).
 *
 * Props:
 *   score:      number   0–1  (or 0–100, auto-normalized)
 *   classification: string  e.g. "WILDFIRE" — shown as context
 *   compact:    boolean  (default: false)
 *
 * Usage:
 *   <ConfidenceClassification score={0.91} classification="WILDFIRE" />
 *   <ConfidenceClassification score={91} classification="FACTORY FLARE" compact />
 */

import { clsx } from '../../utils/classNames'

// Normalize: accepts 0-100 or 0-1
function normalize(score) {
  return score > 1 ? score / 100 : score
}

function classifyConfidence(n) {
  if (n >= 0.85) return { label: 'VERY HIGH', color: 'text-green-400',  bar: 'bg-green-500'  }
  if (n >= 0.70) return { label: 'HIGH',      color: 'text-lime-400',   bar: 'bg-lime-500'   }
  if (n >= 0.50) return { label: 'MODERATE',  color: 'text-yellow-400', bar: 'bg-yellow-500' }
  return              { label: 'LOW',         color: 'text-red-400',    bar: 'bg-red-500'    }
}

// Segmented "ticks" at 0.5, 0.7, 0.85
const TICKS = [0.5, 0.7, 0.85]

export function ConfidenceClassification({ score, classification, compact = false }) {
  const n = normalize(score ?? 0)
  const cfg = classifyConfidence(n)

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2">
        <span className={clsx('font-mono text-sm font-bold', cfg.color)}>
          {n.toFixed(2)}
        </span>
        <span className="text-xs text-gray-500">classify</span>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
          Classification Confidence
        </span>
        {classification && (
          <span className="text-xs font-mono text-gray-300 bg-gray-700/60 px-2 py-0.5 rounded">
            {classification}
          </span>
        )}
      </div>

      {/* Segmented bar with tick marks */}
      <div className="relative h-2 bg-gray-700 rounded-full overflow-visible">
        <div
          className={clsx('absolute left-0 top-0 h-full rounded-full transition-all duration-500', cfg.bar)}
          style={{ width: `${n * 100}%` }}
        />
        {/* Tick marks at 0.5, 0.7, 0.85 */}
        {TICKS.map(t => (
          <div
            key={t}
            className="absolute top-[-3px] w-0.5 h-3.5 bg-gray-900 rounded-sm"
            style={{ left: `${t * 100}%` }}
          />
        ))}
      </div>

      {/* Score */}
      <div className="flex items-end justify-between">
        <span className={clsx('font-mono text-2xl font-bold', cfg.color)}>
          {n.toFixed(2)}
          <span className="text-xs text-gray-400 ml-1">/ 1.00</span>
        </span>
        <span className={clsx('text-xs font-semibold tracking-wider font-mono', cfg.color)}>
          {cfg.label}
        </span>
      </div>

      {/* Scale labels */}
      <div className="flex text-xs text-gray-600 font-mono justify-between px-0.5">
        <span>0.00</span>
        <span className="ml-[50%]">0.70</span>
        <span>1.00</span>
      </div>
    </div>
  )
}
