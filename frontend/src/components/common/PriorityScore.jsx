/**
 * components/common/PriorityScore.jsx
 *
 * Composite risk gauge — displays the 0–100 "priority score".
 *
 * !! CRITICAL TERMINOLOGY RULE !!
 * This MUST always be labeled "Priority Score" — NEVER "Risk Probability",
 * "Risk Percentage", or "Danger %". It is a composite score, not a probability.
 * The subtitle MUST say "not a probability" to prevent misinterpretation by
 * non-technical operators and judges.
 *
 * Visual: Arc gauge with color zones:
 *   0–35   → Safe / Monitor (gray → green)
 *   35–65  → Elevated      (yellow)
 *   65–80  → High          (orange)
 *   80–100 → Critical      (red)
 *
 * Props:
 *   score:    number   0–100
 *   label:    string   override the severity label (optional)
 *   compact:  boolean  (default: false) — numeric-only compact mode
 *   size:     'sm' | 'md' | 'lg' (default: 'md')
 *
 * Usage:
 *   <PriorityScore score={87} />
 *   <PriorityScore score={38} compact />
 */

import { clsx } from '../../utils/classNames'
import { riskScoreToSeverity, SEVERITY_COLOR } from '../../styles/theme'

function scoreColor(score) {
  if (score >= 80) return { text: 'text-red-400',    gauge: '#ef4444', track: '#7f1d1d' }
  if (score >= 65) return { text: 'text-orange-400', gauge: '#f97316', track: '#431407' }
  if (score >= 35) return { text: 'text-yellow-400', gauge: '#eab308', track: '#713f12' }
  return               { text: 'text-green-400',  gauge: '#22c55e', track: '#14532d' }
}

// SVG arc gauge
function ArcGauge({ score, size = 'md' }) {
  const dim = { sm: 64, md: 96, lg: 128 }[size] ?? 96
  const cx = dim / 2
  const cy = dim / 2
  const r  = (dim / 2) - 8
  const strokeW = { sm: 5, md: 7, lg: 9 }[size] ?? 7

  // Arc spans 220 degrees (from 200° to 340° going clockwise)
  const startAngle = 200
  const endAngle   = 340
  const totalArc   = 360 - startAngle + endAngle  // 300 degrees total sweep
  const fillArc    = (score / 100) * totalArc

  const toRad = (deg) => (deg * Math.PI) / 180

  function arcPath(start, end) {
    const s = toRad(start - 90)
    const e = toRad(end - 90)
    const x1 = cx + r * Math.cos(s)
    const y1 = cy + r * Math.sin(s)
    const x2 = cx + r * Math.cos(e)
    const y2 = cy + r * Math.sin(e)
    const large = end - start > 180 ? 1 : 0
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`
  }

  const colors = scoreColor(score)
  const fillEnd = startAngle + fillArc

  return (
    <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`}>
      {/* Track */}
      <path
        d={arcPath(startAngle, startAngle + totalArc)}
        fill="none"
        stroke={colors.track}
        strokeWidth={strokeW}
        strokeLinecap="round"
      />
      {/* Fill */}
      {score > 0 && (
        <path
          d={arcPath(startAngle, Math.min(fillEnd, startAngle + totalArc))}
          fill="none"
          stroke={colors.gauge}
          strokeWidth={strokeW}
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

export function PriorityScore({ score = 0, label, compact = false, size = 'md' }) {
  const colors  = scoreColor(score)
  const severity = label ?? riskScoreToSeverity(score)

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2">
        <span className={clsx('font-mono text-lg font-bold', colors.text)}>{score}</span>
        <span className="text-xs text-gray-500">/100</span>
        <span className={clsx('text-xs font-semibold tracking-wider font-mono', colors.text)}>
          {severity}
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Gauge */}
      <div className="relative">
        <ArcGauge score={score} size={size} />
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={clsx('font-mono font-bold leading-none', colors.text, {
            'text-xl': size === 'sm',
            'text-3xl': size === 'md',
            'text-4xl': size === 'lg',
          })}>
            {score}
          </span>
          <span className="text-gray-500 text-xs">/ 100</span>
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <div className={clsx('text-xs font-bold tracking-widest font-mono uppercase', colors.text)}>
          {severity}
        </div>
        {/* Mandatory terminology clarifier */}
        <div className="text-xs text-gray-600 font-mono mt-0.5">
          priority score, not probability
        </div>
      </div>
    </div>
  )
}
