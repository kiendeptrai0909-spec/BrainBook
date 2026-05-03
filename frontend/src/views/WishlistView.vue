<template>
  <main class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-12 mb-4">
          <h1 class="text-primary fw-bold">My Wishlist</h1>
          <p class="text-muted">Books you've saved for later.</p>
        </div>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>

      <div v-else-if="items.length === 0" class="text-center py-5">
        <div class="mb-4">
          <i class="ti ti-heart-off fs-1 text-muted"></i>
        </div>
        <h3>Your wishlist is empty</h3>
        <p class="text-muted">Explore our shop and save your favorite books!</p>
        <RouterLink to="/shop" class="btn btn-primary px-4 py-2 mt-2">Go to Shop</RouterLink>
      </div>

      <div v-else class="row g-4">
        <div v-for="item in items" :key="item.id" class="col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm border-0 position-relative">
            <button 
              @click="removeFromWishlist(item.bookId)" 
              class="btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
              style="z-index: 10"
            >
              <i class="ti ti-x"></i>
            </button>
            <div class="row g-0 h-100">
              <div class="col-4 bg-light d-flex align-items-center justify-content-center p-3">
                <img 
                  :src="item.book.imageUrl" 
                  class="img-fluid rounded shadow-sm" 
                  alt="book cover"
                  style="max-height: 120px; object-fit: contain"
                />
              </div>
              <div class="col-8">
                <div class="card-body d-flex flex-column h-100">
                  <h6 class="card-title fw-bold mb-1">
                    <RouterLink :to="`/product/${item.book.slug}`" class="text-decoration-none text-dark hover-primary">
                      {{ item.book.title }}
                    </RouterLink>
                  </h6>
                  <p class="text-primary fw-bold mb-2">${{ item.book.price }}</p>
                  <p class="small text-muted mb-3">
                    <span :class="item.book.stock > 0 ? 'text-success' : 'text-danger'">
                      {{ item.book.stock > 0 ? 'In Stock' : 'Out of Stock' }}
                    </span>
                  </p>
                  <div class="mt-auto">
                    <button 
                      @click="addToCart(item.book)" 
                      class="btn btn-sm btn-primary w-100 rounded-pill"
                      :disabled="item.book.stock <= 0"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiGet, apiPost } from '@/lib/api'
import { toast } from 'vue3-toastify'

const items = ref([])
const loading = ref(false)
const router = useRouter()

const fetchWishlist = async () => {
  loading.value = true
  try {
    items.value = await apiGet('/wishlist')
  } catch (error) {
    toast.error('Failed to load wishlist')
  } finally {
    loading.value = false
  }
}

const removeFromWishlist = async (bookId) => {
  try {
    await apiPost(`/wishlist/remove/${bookId}`)
    items.value = items.value.filter(i => i.bookId !== bookId)
    toast.info('Removed from wishlist')
  } catch (error) {
    toast.error('Failed to remove item')
  }
}

const addToCart = async (book) => {
  try {
    await apiPost('/cart/items', {
      body: { bookId: book.id, quantity: 1 }
    })
    toast.success('Added to cart!')
    router.push('/cart')
  } catch (error) {
    toast.error('Failed to add to cart')
  }
}

onMounted(fetchWishlist)
</script>

<style scoped>
.hover-primary:hover {
  color: var(--bs-primary) !important;
}
</style>
