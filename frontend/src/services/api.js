const defaultBaseUrl = 'http://localhost:3000/api'

export const ACCESS_TOKEN_STORAGE_KEY = 'access_token'
export const SESSION_ID_STORAGE_KEY = 'session_id'

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) || localStorage.getItem('token') || ''
}

export function setAccessToken(token) {
  if (!token) return
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token)
}

export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
}

function generateSessionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  // Fallback for older browsers
  return `sess_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export function getSessionId() {
  const existing = localStorage.getItem(SESSION_ID_STORAGE_KEY)
  if (existing) return existing

  const sessionId = generateSessionId()
  localStorage.setItem(SESSION_ID_STORAGE_KEY, sessionId)
  return sessionId
}

function getBaseUrl() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || defaultBaseUrl
  return baseUrl.replace(/\/$/, '')
}

function normalizePath(path) {
  if (!path) return '/'
  return path.startsWith('/') ? path : `/${path}`
}

function shouldAttachSessionId(path, options) {
  if (options?.withSession === true) return true
  // Only attach automatically for cart endpoints.
  return path.startsWith('/cart')
}

async function request(path, options = {}) {
  const normalizedPath = normalizePath(path)
  const headers = new Headers(options.headers || {})
  const token = getAccessToken()

  if (options.requireAuth && !token) {
    throw new Error('Bạn cần đăng nhập để thực hiện thao tác này')
  }

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  if (shouldAttachSessionId(normalizedPath, options) && !headers.has('x-session-id')) {
    headers.set('x-session-id', getSessionId())
  }

  if (options.requireSession && !headers.get('x-session-id')) {
    throw new Error('Thiếu x-session-id')
  }

  const isFormData =
    typeof FormData !== 'undefined' && options.body && options.body instanceof FormData

  if (options.body && !isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${getBaseUrl()}${normalizedPath}`, {
    ...options,
    headers,
  })

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const data = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const message =
      (typeof data === 'object' && data && (data.message || data.error)) ||
      (typeof data === 'string' && data) ||
      'Không thể gọi API'
    throw new Error(Array.isArray(message) ? message.join('\n') : message)
  }

  return data
}

export const apiClient = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) =>
    request(path, {
      ...options,
      method: 'POST',
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
  put: (path, body, options) =>
    request(path, {
      ...options,
      method: 'PUT',
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
  patch: (path, body, options) =>
    request(path, {
      ...options,
      method: 'PATCH',
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
}
