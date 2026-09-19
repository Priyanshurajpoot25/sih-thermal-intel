/**
 * components/common/ConfidenceDetection.jsx
 *
 * Shows satellite DETECTION confidence — three distinct visual states:
 *   HIGH    (score ≥ 85): Green, solid fill bar, checkmark icon
 *   NOMINAL (score ≥ 65): Amber, partial fill bar, warning icon
 *   LOW     (score  < 65): Red,  low fill bar,   error icon
 *
 * IMPORTANT: This is DETECTION confidence (did the satellite actually see fire?)
 * NOT the same as classification confidence (what kind of fire is it?).
 * Label must always say "Detection Confidence" — never just "Confidence".
 *
 * Props:
 *   score:    number   0–100
 *   rating:   'HIGH' | 'NOMINAL' | 'LOW'  (if omitted, derived from score)
 *   compact:  boolean  — single-line compact mode (default: false)
 *   breakdown: object  — full confidence_breakdown from API (optional, for tooltip)
 *
 * Usage:
 *   <ConfidenceDetection score={91} rating="HIGH" />
 *   <ConfidenceDetection score={78} compact />
 */

import { clsx } from '../../utils/classNames'
import { DETECTION_RATING, detectionRatingFromScore } from '../../styles/theme'

export function ConfidenceDetection({ score, rating, compact = false, breakdown }) {
  const resolvedRating = rating ?? detectionRatingFromScore(score)
  const cfg = DETECTION_RATING[resolvedRating] ?? DETECTION_RATING.NOMINAL

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2">
        <span className={clsx('font-mono text-sm font-bold', cfg.color)}>
          {score}%
        </span>
        <span className={clsx('text-xs font-semibold tracking-wider', cfg.color)}>
          {cfg.label}
        </span>
        {/* Mini bar */}
        <div className="w-12 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={clsx('h-full rounded-full', cfg.bar)}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
          Detection Confidence
        </span>
        <span className={clsx('text-xs font-bold tracking-wider font-mono', cfg.color)}>
          {cfg.icon} {cfg.label}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={clsx('absolute left-0 top-0 h-full rounded-full transition-all duration-500', cfg.bar)}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Score + breakdown summary */}
      <div className="flex items-center justify-between">
        <span className={clsx('font-mono text-2xl font-bold', cfg.color)}>
          {score}<span className="text-sm font-normal text-gray-400">%</span>
        </span>
        {breakdown?.sensor_signal && (
          <span className="text-xs text-gray-500 text-right max-w-[60%]">
            {breakdown.sensor_signal}
          </span>
        )}
      </div>

      {/* Threshold markers */}
      <div className="flex text-xs text-gray-600 font-mono justify-between px-0.5">
        <span>LOW</span>
        <span className="ml-[40%]">NOMINAL</span>
        <span>HIGH</span>
      </div>
    </div>
  )
}
