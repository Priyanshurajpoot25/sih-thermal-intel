# 🔥 FireSense Frontend Design System & Component Reference

> **Lead Author:** Priyanshu (Design System / Auth / Citizen Lead)  
> **Collaborators:** Pallabi (NTRO Lead), Adil (Government / Responder Lead)  
> **Problem Statement:** SIH26162 (NTRO)

This document is the **frozen frontend contract** for all three portals. All components, props, hooks, services, and canonical terminology documented here are production-ready in `frontend/src/`.

---

## 🎨 1. Canonical Terminology & Design Tokens (`src/styles/theme.js`)

To prevent discrepancies during live judge defense, all portals must strictly adhere to the following naming conventions:

### A. Severity Spectrum
```javascript
import { SEVERITY_LEVELS, SEVERITY_COLOR } from '@/styles/theme'
// Levels: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE' | 'LOW' | 'SAFE'
```

### B. Lifecycle States (In Strict Machine Sequence)
```javascript
import { STATUS_ORDER, STATUS_COLOR } from '@/styles/theme'
// Order: 'NEW' -> 'INVESTIGATING' -> 'VERIFIED' -> 'DISPATCHED' -> 'CONTAINED' -> 'RESOLVED'
```

### C. Priority Score vs Probability Rule
> **CRITICAL RULE:** The 0–100 composite danger metric is a **Priority Score**, NOT a probability or risk percentage. Always display the subtitle *"priority score, not probability"*.

---

## 🧩 2. Shared Component Library (`@/components/common`)

All components can be cleanly imported via the barrel export:
```jsx
import {
  SeverityBadge,
  SeverityDot,
  ConfidenceDetection,
  ConfidenceClassification,
  PriorityScore,
  StatusPill,
  StatusProgressBar,
  LayoutShell,
  IncidentLogTimeline,
  DemoDataBadge,
  LoadingState,
  ErrorState,
  EmptyState,
  Icon,
} from '@/components/common'
```

---

### `<SeverityBadge />`
Color-coded severity badge with strong visual hierarchy and optional critical pulse animation.

| Prop | Type | Default | Description |
|---|---|---|---|
| `level` | `'CRITICAL' \| 'HIGH' \| 'ELEVATED' \| 'MODERATE' \| 'LOW' \| 'SAFE'` | `'LOW'` | Severity classification |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge dimensions |
| `pulse` | `boolean` | `false` | Enables animated ping effect on critical/high alerts |
| `className` | `string` | `''` | Extra Tailwind classes |

**Usage:**
```jsx
<SeverityBadge level="CRITICAL" pulse size="md" />
```

---

### `<ConfidenceDetection />`
Satellite sensor detection confidence with 3 distinct rating states: **`HIGH`** (≥85%), **`NOMINAL`** (≥65%), **`LOW`** (<65%).

| Prop | Type | Default | Description |
|---|---|---|---|
| `score` | `number` (0–100) | *required* | Raw detection confidence score |
| `rating` | `'HIGH' \| 'NOMINAL' \| 'LOW'` | *derived* | Explicit rating override |
| `compact` | `boolean` | `false` | Single-line horizontal summary |
| `breakdown`| `object` | `undefined` | Detailed satellite signal diagnostics object |

**Usage:**
```jsx
<ConfidenceDetection score={91} breakdown={incident.confidence_breakdown} />
```

---

### `<ConfidenceClassification />`
AI model heuristic confidence displayed as a **`0.00 – 1.00` decimal** with tick marks at 0.50, 0.70, and 0.85.

| Prop | Type | Default | Description |
|---|---|---|---|
| `score` | `number` (0–1 or 0–100) | `0` | Model confidence value |
| `classification` | `string` | `undefined` | Incident type label (e.g. "WILDFIRE", "FACTORY FLARE") |
| `compact` | `boolean` | `false` | Compact decimal badge |

**Usage:**
```jsx
<ConfidenceClassification score={0.94} classification="FACTORY FLARE" />
```

---

### `<PriorityScore />`
Composite risk arc gauge with zone coloring and mandatory non-probability disclaimer.

| Prop | Type | Default | Description |
|---|---|---|---|
| `score` | `number` (0–100) | `0` | Calculated composite danger score |
| `label` | `string` | *derived* | Risk severity label |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Gauge size |
| `compact` | `boolean` | `false` | Numeric-only inline display |

**Usage:**
```jsx
<PriorityScore score={87} size="md" />
```

---

### `<StatusPill />` & `<StatusProgressBar />`
Lifecycle state pill with dynamic indicator dot and progress stepping.

| Prop | Type | Default | Description |
|---|---|---|---|
| `status` | `'NEW' \| 'INVESTIGATING' \| 'VERIFIED' \| 'DISPATCHED' \| 'CONTAINED' \| 'RESOLVED'` | `'NEW'` | Lifecycle state |
| `size` | `'sm' \| 'md'` | `'md'` | Pill size |
| `showStep`| `boolean` | `false` | Shows "2/6" step index |

**Usage:**
```jsx
<StatusPill status="DISPATCHED" />
<StatusProgressBar status={incident.status} />
```

---

### `<IncidentLogTimeline />`
Audit trail component displaying state transition logs, acting authority/algorithm, and IST timestamp.

| Prop | Type | Default | Description |
|---|---|---|---|
| `logs` | `Array<{ timestamp, status, actor?, note? }>` | `[]` | Transition records |
| `compact` | `boolean` | `false` | Reduced padding for sidebars |

**Usage:**
```jsx
<IncidentLogTimeline logs={incident.incident_logs} />
```

---

### `<LayoutShell />`
Standard tactical shell providing topbar with live satellite overpass clock, user profile, logout, and role-filtered navigation sidebar.

| Prop | Type | Default | Description |
|---|---|---|---|
| `portalTitle` | `string` | `''` | E.g. "NTRO Spaceborne Tactical Console" |
| `badge` | `string` | `''` | E.g. "TOP SECRET // COMINT" |
| `children` | `ReactNode` | *required* | Portal view contents |

---

## 🔒 3. Auth & Role Routing (`@/hooks/useAuth`, `@/services/authService`)

### Canonical Roles & Target Portals
| Canonical Role | Target Portal | Clearance Level | Default Demo User |
|---|---|---|---|
| `analyst` | `/ntro` | `TOP SECRET` | `analyst@ntro.gov.in` (`demo1234`) |
| `authority` | `/government` | `RESTRICTED` | `authority@gov.in` (`demo1234`) |
| `responder` | `/responder` | `FIELD` | `responder@firesense.in` (`demo1234`) |
| `admin` | `/ntro` (All) | `ADMIN` | `admin@firesense.in` (`demo1234`) |

### `useAuth()` Hook API
```javascript
import { useAuth } from '@/hooks/useAuth'

function MyComponent() {
  const { user, role, isAuthenticated, isLoading, login, logout } = useAuth()
  // ...
}
```

---

## 📡 4. Data Services Layer (`@/services/`)

### `incidentService.js`
- `getIncidents()` -> `Promise<Incident[]>`
- `getIncident(id)` -> `Promise<Incident>`
- `updateStatus(id, status)` -> `Promise<{ success, incident_id, status }>`
- `dispatch(id)` -> `Promise<{ success, dispatched_to, eta, alert_log }>`
- `getPublicAlerts()` -> `Promise<PublicAlert[]>` (No login required)
- `getStats()` -> `Promise<Stats>`

### `mapService.js`
- `getScenario(scenarioId, useLiveOSM)` -> `Promise<GeoJSON>`
- `getLiveData(mapKey, bbox, source, days)` -> `Promise<GeoJSON>`
- `getGeoJSON()` -> `Promise<GeoJSON>`
