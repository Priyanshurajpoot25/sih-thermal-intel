/**
 * services/incidentService.js
 *
 * All incident-related API calls. Mock mode returns fixture data.
 *
 * API contract (frozen — do NOT change response shapes without notifying
 * Pallabi, Adil, AND Priyanshu):
 *
 *   GET  /api/incidents                → { incidents: Incident[] }
 *   GET  /api/incident/:id             → Incident
 *   POST /api/incident/:id/status      → { success, incident_id, status, message }
 *   POST /api/incident/:id/dispatch    → { success, incident_id, status, dispatched_to, eta, alert_log }
 *   GET  /public/alerts                → { alerts: PublicAlert[] }  (no auth)
 */

import api from './api'
import { MOCK_INCIDENTS, MOCK_INCIDENTS_MAP } from '../fixtures/incidents.mock'
import { MOCK_PUBLIC_ALERTS } from '../fixtures/publicAlerts.mock'

const IS_MOCK = import.meta.env.VITE_APP_MODE === 'mock'

// ── Incidents ────────────────────────────────────────────────────────────────

/**
 * Fetch all incidents.
 * @returns {Promise<Incident[]>}
 */
export async function getIncidents() {
  if (IS_MOCK) {
    await _delay(400)
    return [...MOCK_INCIDENTS]
  }
  const { data } = await api.get('/api/incidents')
  return data.incidents
}

/**
 * Fetch a single incident by ID.
 * @param {string} id  e.g. "INC-2026-0042"
 * @returns {Promise<Incident>}
 */
export async function getIncident(id) {
  if (IS_MOCK) {
    await _delay(250)
    const incident = MOCK_INCIDENTS_MAP[id]
    if (!incident) throw new Error(`Incident ${id} not found`)
    return { ...incident }
  }
  const { data } = await api.get(`/api/incident/${id}`)
  return data
}

/**
 * Update incident lifecycle status.
 * @param {string} id
 * @param {'NEW'|'INVESTIGATING'|'VERIFIED'|'DISPATCHED'|'CONTAINED'|'RESOLVED'} status
 * @returns {Promise<{ success: boolean, status: string }>}
 */
export async function updateStatus(id, status) {
  if (IS_MOCK) {
    await _delay(350)
    // Mutate the mock in-memory (resets on page reload — expected in mock mode)
    if (MOCK_INCIDENTS_MAP[id]) {
      MOCK_INCIDENTS_MAP[id].status = status
      const idx = MOCK_INCIDENTS.findIndex(i => i.id === id)
      if (idx !== -1) MOCK_INCIDENTS[idx].status = status
    }
    return { success: true, incident_id: id, status, message: `Incident ${id} updated to ${status}` }
  }
  const { data } = await api.post(`/api/incident/${id}/status`, { status })
  return data
}

/**
 * Dispatch emergency responders to an incident.
 * @param {string} id
 * @returns {Promise<{ success: boolean, dispatched_to: string, eta: string, alert_log: string }>}
 */
export async function dispatch(id) {
  if (IS_MOCK) {
    await _delay(500)
    const incident = MOCK_INCIDENTS_MAP[id]
    if (!incident) throw new Error(`Incident ${id} not found`)
    incident.status = 'DISPATCHED'
    const idx = MOCK_INCIDENTS.findIndex(i => i.id === id)
    if (idx !== -1) MOCK_INCIDENTS[idx].status = 'DISPATCHED'
    return {
      success: true,
      incident_id: id,
      status: 'DISPATCHED',
      dispatched_to: incident.assigned_authority.name,
      eta: `${incident.assigned_authority.eta_mins} mins`,
      alert_log: `ENCRYPTED SOS TRANSMITTED to ${incident.assigned_authority.name} (Simulated Emergency Channel)`,
    }
  }
  const { data } = await api.post(`/api/incident/${id}/dispatch`)
  return data
}

// ── Public Alerts (no auth) ──────────────────────────────────────────────────

/**
 * Fetch public-facing alerts.
 * This endpoint requires NO authentication.
 * Falls back to mock data if endpoint is unavailable.
 * @returns {Promise<PublicAlert[]>}
 */
export async function getPublicAlerts() {
  if (IS_MOCK) {
    await _delay(300)
    return [...MOCK_PUBLIC_ALERTS]
  }
  try {
    const { data } = await api.get('/public/alerts')
    return data.alerts ?? data
  } catch {
    // Graceful fallback — Public Advisory must never crash
    console.warn('[incidentService] /public/alerts unavailable, using mock data')
    return [...MOCK_PUBLIC_ALERTS]
  }
}

// ── Stats ────────────────────────────────────────────────────────────────────

/**
 * Fetch aggregated dashboard stats.
 * @returns {Promise<{ active_hotspots, critical_alerts, resolved_incidents }>}
 */
export async function getStats() {
  if (IS_MOCK) {
    await _delay(200)
    return {
      active_hotspots: 4,
      critical_alerts: 2,
      resolved_incidents: 12,
      last_overpass: '11:42 IST',
    }
  }
  const { data } = await api.get('/api/stats')
  return data
}

// ── Private helpers ──────────────────────────────────────────────────────────
const _delay = (ms) => new Promise(r => setTimeout(r, ms))
