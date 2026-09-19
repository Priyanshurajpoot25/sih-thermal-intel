/**
 * utils/roles.js
 * Canonical role utilities — all portals must use these functions.
 */

import { ROLE_PORTAL, ROLES } from '../styles/theme'

export { ROLES, ROLE_PORTAL }

/**
 * Returns the home route for a given role.
 * @param {string} role
 * @returns {string} path
 */
export function getHomeRoute(role) {
  return ROLE_PORTAL[role] ?? '/login'
}

/**
 * Checks if a role is allowed given an allowedRoles array.
 * Admin is always allowed.
 * @param {string} role
 * @param {string[]} allowedRoles
 * @returns {boolean}
 */
export function isRoleAllowed(role, allowedRoles) {
  if (role === ROLES.ADMIN) return true
  return allowedRoles.includes(role)
}

/**
 * Returns the display label for a role.
 */
export const ROLE_LABEL = {
  analyst:   'NTRO Analyst',
  authority: 'Government Authority',
  responder: 'Field Responder',
  admin:     'Administrator',
}
