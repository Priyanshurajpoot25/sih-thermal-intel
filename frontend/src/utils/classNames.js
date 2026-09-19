/**
 * utils/classNames.js
 * Lightweight zero-dependency className concatenator replacement for clsx/classnames.
 */

export function clsx(...args) {
  const classes = []
  for (const arg of args) {
    if (!arg) continue
    if (typeof arg === 'string' || typeof arg === 'number') {
      classes.push(arg)
    } else if (Array.isArray(arg)) {
      const inner = clsx(...arg)
      if (inner) classes.push(inner)
    } else if (typeof arg === 'object') {
      for (const [key, value] of Object.entries(arg)) {
        if (value) classes.push(key)
      }
    }
  }
  return classes.join(' ')
}

export default clsx
