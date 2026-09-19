/**
 * services/mapService.js
 *
 * All geospatial / scenario API calls.
 *
 * API contract:
 *   GET /api/pipeline/scenario?id=:id[&live_osm=1]  → GeoJSON FeatureCollection
 *   GET /api/live?map_key=:key&bbox=:bbox            → GeoJSON FeatureCollection
 *   GET /api/export/geojson                          → GeoJSON FeatureCollection
 *   GET /api/stats                                   → Stats object
 */

import api from './api'

const IS_MOCK = import.meta.env.VITE_APP_MODE === 'mock'

// Pre-cached scenario IDs (from backend/samples.py)
export const SCENARIO_IDS = [
  'jamnagar_refinery',
  'similipal_wildfire',
  'angul_thermal_plant',
  'sangrur_stubble',
  'singrauli_clandestine',
]

// Mock GeoJSON stub — returns minimal valid FeatureCollection
function _mockGeoJSON(scenarioId) {
  const coords = {
    jamnagar_refinery:    [69.831, 22.358],
    similipal_wildfire:   [86.352, 21.854],
    angul_thermal_plant:  [85.037, 20.862],
    sangrur_stubble:      [75.839, 30.248],
    singrauli_clandestine:[82.653, 24.184],
  }
  const center = coords[scenarioId] ?? [78.9, 20.5]
  return {
    type: 'FeatureCollection',
    scenario: scenarioId,
    source: 'MOCK',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: center },
        properties: {
          id: `MOCK-${scenarioId}`,
          classification: 'MOCK DATA',
          frp_mw: 85,
          brightness_c: 75,
          risk_score: 60,
          confidence: 88,
        },
      },
    ],
  }
}

/**
 * Run a pre-cached operational scenario through the full pipeline.
 * @param {string} scenarioId  One of SCENARIO_IDS
 * @param {boolean} useLiveOSM  Enable live Overpass query (requires backend)
 * @returns {Promise<GeoJSON.FeatureCollection>}
 */
export async function getScenario(scenarioId, useLiveOSM = false) {
  if (IS_MOCK) {
    await new Promise(r => setTimeout(r, 600))
    return _mockGeoJSON(scenarioId)
  }
  const params = new URLSearchParams({ id: scenarioId })
  if (useLiveOSM) params.set('live_osm', '1')
  const { data } = await api.get(`/api/pipeline/scenario?${params}`)
  return data
}

/**
 * Fetch live NASA FIRMS data for a bounding box.
 * @param {string} mapKey  NASA FIRMS MAP_KEY
 * @param {string} bbox    "minLat,minLon,maxLat,maxLon"  e.g. "6,68,36,98"
 * @param {'viirs'|'modis'} source
 * @param {number} days
 * @returns {Promise<GeoJSON.FeatureCollection>}
 */
export async function getLiveData(mapKey, bbox = '6,68,36,98', source = 'viirs', days = 1) {
  if (IS_MOCK) {
    await new Promise(r => setTimeout(r, 800))
    return _mockGeoJSON('similipal_wildfire')
  }
  const params = new URLSearchParams({ map_key: mapKey, bbox, source, days: String(days) })
  const { data } = await api.get(`/api/live?${params}`)
  return data
}

/**
 * Export all current incidents as GIS-ready GeoJSON.
 * @returns {Promise<GeoJSON.FeatureCollection>}
 */
export async function getGeoJSON() {
  if (IS_MOCK) {
    await new Promise(r => setTimeout(r, 300))
    return {
      type: 'FeatureCollection',
      source: 'MOCK',
      features: [],
    }
  }
  const { data } = await api.get('/api/export/geojson')
  return data
}
