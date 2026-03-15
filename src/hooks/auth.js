// ── Auth Store (localStorage — swap fetch() calls for real API in production) ──

const USERS_KEY   = 'airm_users'
const SESSION_KEY = 'airm_session'
const OTP_KEY     = 'airm_otps'

const ls = {
  get: (k,fb=null) => { try { return JSON.parse(localStorage.getItem(k)??'null')??fb } catch { return fb } },
  set: (k,v) => { try { localStorage.setItem(k,JSON.stringify(v)) } catch {} },
  del: (k)   => { try { localStorage.removeItem(k) } catch {} },
}

// ── OTP ───────────────────────────────────────────────────────────────────────
export function sendOTP(email) {
  const code = String(Math.floor(100000 + Math.random() * 900000))
  const otps = ls.get(OTP_KEY, {})
  otps[email.toLowerCase()] = { code, exp: Date.now() + 10 * 60 * 1000 }
  ls.set(OTP_KEY, otps)
  console.log(`[DEV OTP for ${email}] → ${code}`)
  return code // returned so UI can show it in demo mode
}

export function verifyOTP(email, code) {
  const otps = ls.get(OTP_KEY, {})
  const entry = otps[email.toLowerCase()]
  if (!entry || Date.now() > entry.exp) return false
  return entry.code === String(code).trim()
}

// ── Users ─────────────────────────────────────────────────────────────────────
export function register(name, email, password) {
  const users = ls.get(USERS_KEY, {})
  const key   = email.toLowerCase().trim()
  if (users[key]) return { ok: false, error: 'Email already registered' }
  users[key] = {
    id: `u_${Date.now()}`,
    name: name.trim(),
    email: key,
    password,
    avatar: name.trim()[0].toUpperCase(),
    createdAt: new Date().toISOString(),
  }
  ls.set(USERS_KEY, users)
  return { ok: true }
}

export function login(email, password) {
  const users = ls.get(USERS_KEY, {})
  const user  = users[email.toLowerCase().trim()]
  if (!user)               return { ok: false, error: 'No account found with this email' }
  if (user.password !== password) return { ok: false, error: 'Incorrect password' }
  const sess = { id: user.id, name: user.name, email: user.email, avatar: user.avatar }
  ls.set(SESSION_KEY, sess)
  return { ok: true, user: sess }
}

export function logout() { ls.del(SESSION_KEY) }

export function getSession() { return ls.get(SESSION_KEY) }

export function resetPassword(email, newPass) {
  const users = ls.get(USERS_KEY, {})
  const key   = email.toLowerCase().trim()
  if (!users[key]) return { ok: false, error: 'No account with this email' }
  users[key].password = newPass
  ls.set(USERS_KEY, users)
  return { ok: true }
}
