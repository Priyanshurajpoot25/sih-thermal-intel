/**
 * FireSense Design Tokens
 * Single source of truth — import this instead of hard-coding color strings.
 * Terminology is CANONICAL: all three portals must use these exact strings.
 */

// ── Severity ────────────────────────────────────────────────────────────────
export const SEVERITY_LEVELS = ['CRITICAL', 'HIGH', 'ELEVATED', 'MODERATE', 'LOW', 'SAFE']

export const SEVERITY_COLOR = {
  CRITICAL: { bg: 'bg-red-600',    text: 'text-red-100',    border: 'border-red-500',    dot: 'bg-red-500'    },
  HIGH:     { bg: 'bg-orange-500', text: 'text-orange-100', border: 'border-orange-400', dot: 'bg-orange-400' },
  ELEVATED: { bg: 'bg-yellow-500', text: 'text-yellow-900', border: 'border-yellow-400', dot: 'bg-yellow-400' },
  MODERATE: { bg: 'bg-blue-500',   text: 'text-blue-100',   border: 'border-blue-400',   dot: 'bg-blue-400'   },
  LOW:      { bg: 'bg-green-600',  text: 'text-green-100',  border: 'border-green-500',  dot: 'bg-green-500'  },
  SAFE:     { bg: 'bg-gray-600',   text: 'text-gray-200',   border: 'border-gray-500',   dot: 'bg-gray-400'   },
}

// ── Detection Confidence (HIGH / NOMINAL / LOW) ──────────────────────────────
export const DETECTION_RATING = {
  HIGH:    { label: 'HIGH',    color: 'text-green-400',  bar: 'bg-green-500',   icon: '●' },
  NOMINAL: { label: 'NOMINAL', color: 'text-yellow-400', bar: 'bg-yellow-500',  icon: '◐' },
  LOW:     { label: 'LOW',     color: 'text-red-400',    bar: 'bg-red-500',     icon: '○' },
}

// Derive detection rating from a 0-100 score
export function detectionRatingFromScore(score) {
  if (score >= 85) return 'HIGH'
  if (score >= 65) return 'NOMINAL'
  return 'LOW'
}

// ── Status Lifecycle ─────────────────────────────────────────────────────────
export const STATUS_ORDER = ['NEW', 'INVESTIGATING', 'VERIFIED', 'DISPATCHED', 'CONTAINED', 'RESOLVED']

export const STATUS_COLOR = {
  NEW:          { bg: 'bg-indigo-500/20',  text: 'text-indigo-300',  border: 'border-indigo-500/40',  dot: 'bg-indigo-400'  },
  INVESTIGATING:{ bg: 'bg-violet-500/20',  text: 'text-violet-300',  border: 'border-violet-500/40',  dot: 'bg-violet-400'  },
  VERIFIED:     { bg: 'bg-blue-500/20',    text: 'text-blue-300',    border: 'border-blue-500/40',    dot: 'bg-blue-400'    },
  DISPATCHED:   { bg: 'bg-orange-500/20',  text: 'text-orange-300',  border: 'border-orange-500/40',  dot: 'bg-orange-400'  },
  CONTAINED:    { bg: 'bg-yellow-500/20',  text: 'text-yellow-300',  border: 'border-yellow-500/40',  dot: 'bg-yellow-400'  },
  RESOLVED:     { bg: 'bg-green-500/20',   text: 'text-green-300',   border: 'border-green-500/40',   dot: 'bg-green-400'   },
}

// ── Risk Score Thresholds ────────────────────────────────────────────────────
// Maps a 0-100 priority score to a severity level for display
export function riskScoreToSeverity(score) {
  if (score >= 80) return 'CRITICAL'
  if (score >= 65) return 'HIGH'
  if (score >= 50) return 'ELEVATED'
  if (score >= 35) return 'MODERATE'
  if (score >= 15) return 'LOW'
  return 'SAFE'
}

// ── Roles ─────────────────────────────────────────────────────────────────────
export const ROLES = {
  ANALYST:   'analyst',    // → NTRO portal
  AUTHORITY: 'authority',  // → Government portal
  RESPONDER: 'responder',  // → Responder portal
  ADMIN:     'admin',      // → All portals
}

export const ROLE_PORTAL = {
  analyst:   '/ntro',
  authority: '/government',
  responder: '/responder',
  admin:     '/ntro',  // Admin defaults to NTRO
}

export const ROLE_LABEL = {
  analyst:   'NTRO Analyst',
  authority: 'Government Authority',
  responder: 'Field Responder',
  admin:     'Administrator',
}
