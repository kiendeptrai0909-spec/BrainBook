<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow-premium border-0 rounded-4 p-4">
          <div class="text-center mb-4">
            <h2 class="fw-bold text-primary">Forgot Password</h2>
            <p class="text-muted">Enter your email and we'll send you a link to reset your password.</p>
          </div>
          <form @submit.prevent="handleForgot">
            <div class="mb-4">
              <label class="form-label fw-bold">Email Address</label>
              <input 
                v-model="email" 
                type="email" 
                class="form-control form-control-lg rounded-pill" 
                placeholder="name@example.com"
                required
              />
            </div>
            <button 
              type="submit" 
              class="btn btn-primary btn-lg w-100 rounded-pill shadow-sm" 
              :disabled="loading"
            >
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
              Send Reset Link
            </button>
          </form>
          <div class="text-center mt-4">
            <RouterLink to="/login" class="text-decoration-none fw-bold text-dark">
              <i class="ti ti-arrow-left"></i> Back to Login
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { apiPost } from '@/lib/api'
import { toast } from 'vue3-toastify'

const email = ref('')
const loading = ref(false)

const handleForgot = async () => {
  loading.value = true
  try {
    const res = await apiPost('/auth/forgot-password', { body: { email: email.value } })
    toast.success(res.message || 'Check your email for the reset link!')
  } catch (err) {
    toast.error(err.message || 'Failed to send reset link')
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
