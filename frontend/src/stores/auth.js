import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'

const API_URL = 'http://localhost:3000'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(null)

  const isLoggedIn = computed(() => !!token.value)

  async function login(email, password) {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.message || 'Login failed')
      }

      token.value = data.accessToken
      localStorage.setItem('token', data.accessToken)
      
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
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed')
      }

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
      const res = await fetch(`${API_URL}/auth/profile`, {
        headers: { 'Authorization': `Bearer ${token.value}` }
      })
      if (res.ok) {
        user.value = await res.json()
      } else {
        logout() // Invalid token
      }
    } catch (err) {
      console.error(err)
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    toast.info('Logged out.')
    
    // Quick reload to clear state, or just emit event
    window.location.reload()
  }

  // Load profile on start
  if (token.value) {
    fetchProfile()
  }

  return { token, user, isLoggedIn, login, register, logout, fetchProfile }
})
