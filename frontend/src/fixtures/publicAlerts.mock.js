/**
 * Mock Public Alerts Fixture
 * Used by PublicAdvisory.jsx when VITE_APP_MODE=mock
 * or when GET /public/alerts is unavailable.
 *
 * Deliberately conservative — only shows information safe for public release.
 * No classified coordinates or raw satellite data.
 */

export const MOCK_PUBLIC_ALERTS = [
  {
    id: 'ALT-PUB-001',
    title: 'Forest Fire — Mayurbhanj District, Odisha',
    severity: 'HIGH',
    summary: 'An active forest fire has been detected in the Similipal National Park buffer zone. Residents of Kaptipada village and nearby settlements should be on alert.',
    issued_at: '2026-09-19T11:42:00+05:30',
    updated_at: '2026-09-19T11:55:00+05:30',
    affected_area: 'Kaptipada, Mayurbhanj District, Odisha',
    guidance: [
      'Stay indoors and keep windows and doors closed.',
      'Wet cloth over nose and mouth if smoke is visible.',
      'Evacuate toward NH-49 if instructed by local authorities.',
      'Call District Emergency Helpline: 112',
    ],
    nearest_shelter: {
      name: 'Baripada Town Hall Emergency Shelter',
      distance_km: 14.2,
      capacity: 2000,
      contact: '+91-6792-255-000',
    },
    status: 'ACTIVE',
  },
  {
    id: 'ALT-PUB-002',
    title: 'Air Quality Advisory — Sangrur District, Punjab',
    severity: 'MODERATE',
    summary: 'Crop stubble burning detected across Sangrur agricultural belt. Air quality may be significantly reduced. Sensitive groups should remain indoors.',
    issued_at: '2026-09-19T11:42:00+05:30',
    updated_at: '2026-09-19T11:42:00+05:30',
    affected_area: 'Sangrur, Barnala, and Patiala Districts, Punjab',
    guidance: [
      'Avoid outdoor activities, especially exercise.',
      'Children, elderly, and those with respiratory conditions should stay indoors.',
      'Schools may close if AQI exceeds 300 — check school announcements.',
      'Wear N95 mask if outdoor movement is necessary.',
    ],
    nearest_shelter: null,  // Air quality alert, no shelter needed
    status: 'ACTIVE',
  },
  {
    id: 'ALT-PUB-003',
    title: 'Routine Industrial Monitoring — Jamnagar, Gujarat',
    severity: 'LOW',
    summary: 'Thermal signatures at Jamnagar refinery are within normal operating parameters. No public safety risk. Routine monitoring in progress.',
    issued_at: '2026-09-19T11:42:00+05:30',
    updated_at: '2026-09-19T11:42:00+05:30',
    affected_area: 'Jamnagar Industrial Zone, Gujarat',
    guidance: [
      'No action required for general public.',
      'Industrial workers: follow standard facility safety protocols.',
    ],
    nearest_shelter: null,
    status: 'MONITORING',
  },
]

// Emergency shelters — used by the shelter locator in Public Advisory
export const MOCK_SHELTERS = [
  {
    id: 'SH-001',
    name: 'Baripada Town Hall Emergency Shelter',
    district: 'Mayurbhanj, Odisha',
    coordinates: { lat: 21.935, lon: 86.733 },
    capacity: 2000,
    current_occupancy: 0,
    facilities: ['Water', 'Food', 'First Aid', 'Generator'],
    contact: '+91-6792-255-000',
    status: 'OPEN',
  },
  {
    id: 'SH-002',
    name: 'Kaptipada Community Centre',
    district: 'Mayurbhanj, Odisha',
    coordinates: { lat: 21.812, lon: 86.501 },
    capacity: 500,
    current_occupancy: 0,
    facilities: ['Water', 'First Aid'],
    contact: '+91-6792-255-112',
    status: 'OPEN',
  },
  {
    id: 'SH-003',
    name: 'Sangrur District Collectorate Hall',
    district: 'Sangrur, Punjab',
    coordinates: { lat: 30.234, lon: 75.844 },
    capacity: 1500,
    current_occupancy: 0,
    facilities: ['Water', 'Food', 'First Aid', 'Oxygen Cylinders'],
    contact: '+91-1672-221-000',
    status: 'OPEN',
  },
]

// Safety guidance always shown, regardless of active alerts
export const GENERAL_SAFETY_TIPS = [
  { icon: 'fire',   tip: 'Never re-enter a fire zone without clearance from emergency services.' },
  { icon: 'smoke',  tip: 'Smoke inhalation is the primary cause of fire fatalities. Always move to fresh air.' },
  { icon: 'phone',  tip: 'National Emergency: 112 | Fire Brigade: 101 | Ambulance: 108' },
  { icon: 'map',    tip: 'Know your nearest evacuation route before an emergency occurs.' },
  { icon: 'alert',  tip: 'Register for SMS alerts with your District Emergency Management Authority.' },
]
