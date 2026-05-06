<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow-premium border-0 rounded-4 p-4">
          <div class="text-center mb-4">
            <h2 class="fw-bold text-primary">Set New Password</h2>
            <p class="text-muted">Please enter your new password below.</p>
          </div>
          <form @submit.prevent="handleReset">
            <div class="mb-3">
              <label class="form-label fw-bold">New Password</label>
              <input 
                v-model="password" 
                type="password" 
                class="form-control form-control-lg rounded-pill" 
                placeholder="••••••••"
                required
                minlength="6"
              />
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold">Confirm New Password</label>
              <input 
                v-model="confirmPassword" 
                type="password" 
                class="form-control form-control-lg rounded-pill" 
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit" 
              class="btn btn-primary btn-lg w-100 rounded-pill shadow-sm" 
              :disabled="loading"
            >
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiPost } from '@/lib/api'
import { toast } from 'vue3-toastify'

const route = useRoute()
const router = useRouter()
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const token = ref('')

onMounted(() => {
  token.value = route.query.token
  if (!token.value) {
    toast.error('Invalid or missing token')
    router.push('/login')
  }
})

const handleReset = async () => {
  if (password.value !== confirmPassword.value) {
    toast.warning('Passwords do not match')
    return
  }

  loading.value = true
  try {
    await apiPost('/auth/reset-password', { 
      body: { 
        token: token.value, 
        password: password.value 
      } 
    })
    toast.success('Password updated! You can now login.')
    router.push('/login')
  } catch (err) {
    toast.error(err.message || 'Failed to reset password')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.shadow-premium {
  box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
}
</style>
