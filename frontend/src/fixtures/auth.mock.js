/**
 * Mock Auth Fixture
 * Four demo accounts — one per canonical role.
 * Password for all accounts: demo1234
 *
 * These credentials are ONLY active when VITE_APP_MODE=mock.
 * In live mode, the backend JWT endpoint is called instead.
 */

// Simulate a deterministic JWT payload (base64url of JSON)
function makeToken(user) {
  const header  = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({
    sub: user.id,
    username: user.username,
    role: user.role,
    name: user.name,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8, // 8 hr expiry
    iat: Math.floor(Date.now() / 1000),
  }))
  const sig = btoa('mock-sig')
  return `${header}.${payload}.${sig}`
}

export const MOCK_USERS = [
  {
    id:       'u-001',
    username: 'analyst@ntro.gov.in',
    password: 'demo1234',
    name:     'Pallabi Sharma',
    role:     'analyst',
    agency:   'NTRO Intelligence Cell',
    clearance:'TOP SECRET',
  },
  {
    id:       'u-002',
    username: 'authority@gov.in',
    password: 'demo1234',
    name:     'Adil Khan',
    role:     'authority',
    agency:   'District Emergency Management Authority',
    clearance:'RESTRICTED',
  },
  {
    id:       'u-003',
    username: 'responder@firesense.in',
    password: 'demo1234',
    name:     'Field Officer Ravi',
    role:     'responder',
    agency:   'Baripada Fire & Emergency Services',
    clearance:'FIELD',
  },
  {
    id:       'u-004',
    username: 'admin@firesense.in',
    password: 'demo1234',
    name:     'System Admin',
    role:     'admin',
    agency:   'FireSense Platform',
    clearance:'ADMIN',
  },
]

/**
 * Simulate POST /api/auth/login
 * Returns { token, user } on success, throws on failure.
 */
export async function mockLogin(username, password) {
  // Simulate network latency
  await new Promise(r => setTimeout(r, 600))

  const user = MOCK_USERS.find(
    u => u.username === username && u.password === password
  )

  if (!user) {
    throw new Error('Invalid credentials. Use one of the demo accounts below.')
  }

  // Strip password before returning
  const { password: _pw, ...safeUser } = user
  const token = makeToken(safeUser)

  return { token, user: safeUser }
}
