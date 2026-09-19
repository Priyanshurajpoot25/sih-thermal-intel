# FireSense Frontend Foundation — Tasks

## Phase 1 — Scaffolding
- [x] Initialize Vite + React project in `frontend/`
- [x] vite.config.js (proxy + env)
- [x] tailwind.config.js + postcss.config.js
- [x] package.json with all deps
- [x] .env.example & .env.local
- [x] folder structure

## Phase 2 — Services & Auth Layer
- [x] services/api.js (Axios + JWT interceptor + 401 redirect)
- [x] services/authService.js (dual-mode mock & live)
- [x] services/incidentService.js (full CRUD, dispatch, public alerts)
- [x] services/mapService.js (scenarios, live FIRMS, GeoJSON export)
- [x] context/AuthContext.jsx (role state, persistence, restore)
- [x] hooks/useAuth.js (hook wrapper)
- [x] utils/roles.js (canonical role mapping & helper utilities)

## Phase 3 — Login + Route Guards
- [x] pages/Login.jsx (role-based auth, quick-fill demo buttons)
- [x] App.jsx (react-router v6, role guards)
- [x] components/auth/ProtectedRoute.jsx

## Phase 4 — Design System
- [x] styles/index.css
- [x] styles/theme.js
- [x] components/common/SeverityBadge.jsx
- [x] components/common/ConfidenceDetection.jsx
- [x] components/common/ConfidenceClassification.jsx
- [x] components/common/PriorityScore.jsx
- [x] components/common/StatusPill.jsx
- [x] components/common/DemoDataBadge.jsx
- [x] components/common/States.jsx (LoadingState, ErrorState, EmptyState)
- [x] components/common/LayoutShell.jsx
- [x] components/common/Icon.jsx (22 inline line icons)
- [x] components/common/index.js (barrel export)

## Phase 5 — Incident Log Timeline
- [x] components/common/IncidentLogTimeline.jsx (audit trail & status transitions)

## Phase 6 — Public Advisory
- [x] pages/PublicAdvisory.jsx (isolated citizen feed, safety tips, shelters)

## Phase 7 — Stubs & Landing
- [x] pages/Landing.jsx (cinematic landing with problem statement)
- [x] pages/NTRO.jsx (Pallabi's zone)
- [x] pages/Government.jsx (Adil's zone)
- [x] pages/Responder.jsx (Adil's zone)

## Phase 8 — Fixtures
- [x] src/fixtures/incidents.mock.js
- [x] src/fixtures/auth.mock.js
- [x] src/fixtures/publicAlerts.mock.js

## Phase 9 — Docs & Verification
- [x] docs/frontend_components.md (props documentation & canonical terminology contract)
- [x] Verification: `npm run build` succeeds cleanly in <1s
