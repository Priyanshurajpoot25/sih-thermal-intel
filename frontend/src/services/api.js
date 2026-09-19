/**
 * services/api.js
 * Axios instance — the ONLY place HTTP calls originate.
 *
 * Features:
 * - Sets baseURL from VITE_API_URL
 * - Attaches JWT Authorization header on every request
 * - Handles 401 globally: clears token → redirects to /login
 * - Mock mode shim: if VITE_APP_MODE=mock, axios calls still work but
 *   services override them individually with fixture data before calling this.
 */

import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// ── Request interceptor — attach JWT ────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fs_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response interceptor — handle 401 ──────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear and redirect
      localStorage.removeItem('fs_token')
      localStorage.removeItem('fs_user')
      // Use window.location to avoid importing react-router here
      if (window.location.pathname !== '/login') {
        window.location.href = '/login?reason=session_expired'
      }
    }
    return Promise.reject(error)
  }
)

export default api
