export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api'

// 1. Hàm lấy Session ID (Cho khách vãng lai)
export function getSessionId() {
  const key = 'brainbook_session_id'
  let id = localStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(key, id)
  }
  return id
}

// 2. Hàm lấy Token (Cho người dùng đã đăng nhập)
export function getToken() {
  return localStorage.getItem('access_token') // Key này tùy thuộc vào cách bạn lưu lúc Login
}

export async function apiRequest(
  path,
  // Đổi includeSession mặc định thành TRUE để không bao giờ bị quên gửi mã giỏ hàng
  { method = 'GET', params, headers, body, includeSession = true } = {},
) {
  const url = new URL(`${API_BASE_URL}${path}`)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null || value === '') continue
      url.searchParams.set(key, String(value))
    }
  }

  // Nhận diện xem body có phải là file ảnh (FormData) không
  const isFormData = body instanceof FormData

  const nextHeaders = {
    Accept: 'application/json',
    // Nếu là FormData (up ảnh) thì trình duyệt tự tính Content-Type, không được ghi đè
    ...(body && !isFormData ? { 'Content-Type': 'application/json' } : {}),
    // Tự động gắn Session ID (Cho giỏ hàng Guest)
    ...(includeSession ? { 'X-Session-Id': getSessionId() } : {}),
    ...(headers ?? {}),
  }

  // Tự động gắn Token (Nếu user đã đăng nhập)
  const token = getToken()
  if (token) {
    nextHeaders['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(url, {
    method,
    headers: nextHeaders,
    credentials: 'include',
    // Nếu là FormData thì giữ nguyên, ngược lại chuyển thành JSON chuỗi
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
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
