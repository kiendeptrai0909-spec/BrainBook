import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'
import { apiPost, apiGet } from '@/lib/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(null)

  const isLoggedIn = computed(() => !!token.value)

  async function login(email, password) {
    try {
      const data = await apiPost('/auth/login', { body: { email, password } })
      
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
      const data = await apiGet('/auth/profile', { headers: { 'Authorization': `Bearer ${token.value}` } })
      user.value = data
    } catch (err) {
      console.error(err)
      logout() // Invalid token
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
