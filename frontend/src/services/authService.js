/**
 * services/authService.js
 *
 * Handles authentication for all roles.
 * - Mock mode (VITE_APP_MODE=mock): uses fixture credentials, no backend needed.
 * - Live mode: calls POST /api/auth/login → expects { token, user: { id, username, role, name } }
 *
 * Token storage: localStorage key "fs_token"
 * User storage:  localStorage key "fs_user"
 */

import api from './api'
import { mockLogin } from '../fixtures/auth.mock'

const IS_MOCK = import.meta.env.VITE_APP_MODE === 'mock'

const TOKEN_KEY = 'fs_token'
const USER_KEY  = 'fs_user'

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Login — works in both mock and live mode.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{ token: string, user: object }>}
 */
export async function login(username, password) {
  if (IS_MOCK) {
    const result = await mockLogin(username, password)
    _store(result.token, result.user)
    return result
  }

  // Live mode — POST /api/auth/login
  // Response shape expected: { token: string, user: { id, username, role, name, agency? } }
  const { data } = await api.post('/api/auth/login', { username, password })
  _store(data.token, data.user)
  return data
}

/**
 * Logout — clears all stored credentials.
 */
export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

/**
 * Returns the currently stored token (or null).
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * Returns the currently stored user object (or null).
 */
export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * Returns true if a token is present (not validated — just presence check).
 */
export function isAuthenticated() {
  return Boolean(getToken())
}

/**
 * Decodes the JWT payload without signature verification.
 * Safe to use for UI role/display purposes only — never for security decisions.
 * @returns {object|null}
 */
export function decodeToken(token) {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

// ── Private helpers ──────────────────────────────────────────────────────────

function _store(token, user) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}
