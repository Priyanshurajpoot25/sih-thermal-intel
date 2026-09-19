/**
 * components/common/DemoDataBadge.jsx
 *
 * Floating "DEMO DATA" badge — shown when VITE_APP_MODE=mock.
 * Must appear in all three portals during demo mode.
 * Positioned top-right by default, above all other elements (z-50).
 *
 * Props:
 *   position: 'top-right' | 'top-left' | 'inline'  (default: 'top-right')
 *   message:  string  override text (default: 'DEMO DATA — Mock Mode Active')
 *
 * Usage:
 *   <DemoDataBadge />
 *   <DemoDataBadge position="inline" />
 */

import { clsx } from '../../utils/classNames'

const IS_MOCK = import.meta.env.VITE_APP_MODE === 'mock'

export function DemoDataBadge({ position = 'top-right', message }) {
  // Only render in mock mode
  if (!IS_MOCK) return null

  const text = message ?? 'DEMO DATA — Mock Mode Active'

  if (position === 'inline') {
    return (
      <span className="inline-flex items-center gap-1 bg-yellow-400/20 text-yellow-300 border border-yellow-500/40 rounded-full font-mono text-xs px-2 py-0.5 font-semibold tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
        DEMO
      </span>
    )
  }

  const posClass = {
    'top-right': 'fixed top-4 right-4 z-50',
    'top-left':  'fixed top-4 left-4 z-50',
  }[position]

  return (
    <div
      className={clsx(
        'flex items-center gap-2 bg-yellow-500 text-yellow-900 font-mono text-xs font-bold',
        'px-3 py-1.5 rounded-full shadow-lg border border-yellow-600 select-none',
        posClass
      )}
    >
      <span className="w-2 h-2 rounded-full bg-yellow-900 animate-pulse" />
      {text}
    </div>
  )
}
