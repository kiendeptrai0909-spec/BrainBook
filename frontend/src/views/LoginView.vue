<template>
  <main class="py-5 bg-light min-vh-100 d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="card shadow-lg border-0 p-4">
            <div class="text-center mb-4">
              <h2 class="fw-bold text-primary">Login to BrainBook</h2>
              <p class="text-muted">Access your account and orders</p>
            </div>
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label">Email address</label>
                <input v-model="email" type="email" class="form-control" placeholder="name@example.com" required />
              </div>
              <div class="mb-3">
                <label class="form-label d-flex justify-content-between">
                  Password
                  <a href="#" class="small text-decoration-none">Forgot password?</a>
                </label>
                <input v-model="password" type="password" class="form-control" placeholder="Enter password" required />
              </div>
              <button type="submit" class="btn btn-primary w-100 py-2 mt-3" :disabled="loading">
                {{ loading ? 'Logging in...' : 'Login' }}
              </button>
            </form>
            <div class="text-center mt-4">
              <p class="small text-muted">Don't have an account? 
                <RouterLink to="/register" class="text-primary fw-bold text-decoration-none">Register here</RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  const success = await auth.login(email.value, password.value)
  loading.value = false
  if (success) {
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  }
}
</script>
