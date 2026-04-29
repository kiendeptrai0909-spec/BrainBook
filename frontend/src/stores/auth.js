import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'
import { apiPost, apiGet } from '@/lib/api'
import { clearAccessToken, getAccessToken, setAccessToken } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(getAccessToken() || null)
  const user = ref(null)

  const isLoggedIn = computed(() => !!token.value)

  function setToken(nextToken) {
    token.value = nextToken || null
    if (nextToken) {
      setAccessToken(nextToken)
      localStorage.setItem('token', nextToken)
    } else {
      clearAccessToken()
      localStorage.removeItem('token')
    }
  }

  async function login(email, password) {
    try {
      const data = await apiPost('/auth/login', { body: { email, password } })

      const nextToken =
        data.accessToken || data.access_token || data.token || data?.data?.accessToken
      if (!nextToken) {
        throw new Error('Không nhận được token đăng nhập')
      }

      setToken(nextToken)

      toast.success('Logged in successfully!')
      await fetchProfile()
      return true
    } catch (err) {
      toast.error(err.message)
      return false
    }
  }

  async function register(email, password) {
    try {
      await apiPost('/auth/register', { body: { email, password } })
      toast.success('Registration successful! Please login.')
      return true
    } catch (err) {
      toast.error(err.message)
      return false
    }
  }

  async function fetchProfile() {
    if (!token.value) return
    try {
      const data = await apiGet('/auth/profile', {
        headers: { Authorization: `Bearer ${token.value}` },
      })
      user.value = data
    } catch (err) {
      console.error(err)
      logout() // Invalid token
    }
  }

  function logout() {
    setToken(null)
    user.value = null
    toast.info('Logged out.')

    // Quick reload to clear state, or just emit event
    window.location.reload()
  }

  // Load profile on start
  if (token.value) {
    fetchProfile()
  }

  return { token, user, isLoggedIn, login, register, logout, fetchProfile, setToken }
})
