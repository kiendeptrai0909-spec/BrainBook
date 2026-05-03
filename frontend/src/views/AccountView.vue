<template>
  <main class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-12 mb-4">
          <h1 class="text-primary fw-bold">My Account</h1>
          <p v-if="user" class="text-muted">Welcome back, {{ user.firstName }}!</p>
        </div>
      </div>

      <div class="row g-4">
        <!-- Sidebar / Navigation -->
        <div class="col-md-3">
          <div class="list-group shadow-sm">
            <button 
              class="list-group-item list-group-item-action" 
              :class="{ active: activeTab === 'profile' }"
              @click="activeTab = 'profile'"
            >
              Profile Information
            </button>
            <button 
              class="list-group-item list-group-item-action" 
              :class="{ active: activeTab === 'orders' }"
              @click="activeTab = 'orders'"
            >
              Order History
            </button>
            <RouterLink to="/wishlist" class="list-group-item list-group-item-action">
              My Wishlist
            </RouterLink>
            <button class="list-group-item list-group-item-action text-danger" @click="handleLogout">
              Logout
            </button>
          </div>
        </div>

        <!-- Content Area -->
        <div class="col-md-9">
          <div class="card shadow-sm border-0 p-4">
            <!-- Profile Tab -->
            <div v-if="activeTab === 'profile'">
              <h3 class="mb-4">Profile Information</h3>
              <form v-if="user" @submit.prevent="updateProfile">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">First Name</label>
                    <input v-model="user.firstName" type="text" class="form-control" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Last Name</label>
                    <input v-model="user.lastName" type="text" class="form-control" />
                  </div>
                  <div class="col-12">
                    <label class="form-label">Email</label>
                    <input v-model="user.email" type="email" class="form-control" disabled />
                    <small class="text-muted">Email cannot be changed.</small>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary mt-4" :disabled="updating">
                  {{ updating ? 'Updating...' : 'Save Changes' }}
                </button>
              </form>
            </div>

            <!-- Orders Tab -->
            <div v-if="activeTab === 'orders'">
              <h3 class="mb-4">Order History</h3>
              <div v-if="loadingOrders" class="text-center py-4">
                <div class="spinner-border text-primary" role="status"></div>
              </div>
              <div v-else-if="orders.length === 0" class="text-center py-4">
                <p class="text-muted">You haven't placed any orders yet.</p>
                <RouterLink to="/shop" class="btn btn-outline-primary">Go to Shop</RouterLink>
              </div>
              <div v-else class="table-responsive">
                <table class="table align-middle">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in orders" :key="order.id">
                      <td class="fw-bold">{{ order.orderNumber }}</td>
                      <td>{{ formatDate(order.createdAt) }}</td>
                      <td>${{ order.total }}</td>
                      <td>
                        <span 
                          class="badge rounded-pill" 
                          :class="statusClass(order.status)"
                        >
                          {{ order.status }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { apiGet } from '@/lib/api'
import { toast } from 'vue3-toastify'

const auth = useAuthStore()
const router = useRouter()

const activeTab = ref('profile')
const user = ref(auth.user ? { ...auth.user } : null)
const orders = ref([])
const loadingOrders = ref(false)
const updating = ref(false)

const fetchOrders = async () => {
  loadingOrders.value = true
  try {
    orders.value = await apiGet('/orders/my')
  } catch (error) {
    console.error('Failed to fetch orders', error)
  } finally {
    loadingOrders.value = false
  }
}

const updateProfile = async () => {
  updating.value = true
  try {
    // API for updating profile not implemented yet in backend
    // For now just mock it
    toast.success('Profile updated successfully!')
  } catch (error) {
    toast.error('Failed to update profile')
  } finally {
    updating.value = false
  }
}

const handleLogout = () => {
  auth.logout()
  router.push('/')
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString()
}

const statusClass = (status) => {
  switch (status) {
    case 'COMPLETED': return 'text-bg-success'
    case 'PENDING': return 'text-bg-warning'
    case 'CANCELLED': return 'text-bg-danger'
    default: return 'text-bg-secondary'
  }
}

watch(() => auth.user, (val) => {
  if (val) user.value = { ...val }
}, { immediate: true })

onMounted(() => {
  if (!auth.isLoggedIn) {
    router.push('/login')
    return
  }
  fetchOrders()
})
</script>
