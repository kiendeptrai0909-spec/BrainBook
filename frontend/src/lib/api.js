export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api'

export function getSessionId() {
  const key = 'brainbook_session_id'
  let id = localStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(key, id)
  }
  return id
}

export async function apiRequest(
  path,
  { method = 'GET', params, headers, body, includeSession = false } = {},
) {
  const url = new URL(`${API_BASE_URL}${path}`)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null || value === '') continue
      url.searchParams.set(key, String(value))
    }
  }

  const nextHeaders = {
    Accept: 'application/json',
    ...(body ? { 'Content-Type': 'application/json' } : {}),
    ...(includeSession ? { 'X-Session-Id': getSessionId() } : {}),
    ...(headers ?? {}),
  }

  const res = await fetch(url, {
    method,
    headers: nextHeaders,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`${method} ${url.pathname} failed: ${res.status} ${text}`)
  }

  if (res.status === 204) return null
  return res.json()
}

export async function apiGet(path, { params, headers, includeSession } = {}) {
  return apiRequest(path, { method: 'GET', params, headers, includeSession })
}

export async function apiPost(path, { params, headers, body, includeSession } = {}) {
  return apiRequest(path, { method: 'POST', params, headers, body, includeSession })
}

export async function apiPatch(path, { params, headers, body, includeSession } = {}) {
  return apiRequest(path, { method: 'PATCH', params, headers, body, includeSession })
}

export async function apiDelete(path, { params, headers, body, includeSession } = {}) {
  return apiRequest(path, { method: 'DELETE', params, headers, body, includeSession })
}
