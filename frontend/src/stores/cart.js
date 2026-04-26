import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { toast } from 'vue3-toastify'

const API_URL = 'http://localhost:3000'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const auth = useAuthStore()

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.quantity * item.price), 0)
  })

  async function fetchCart() {
    if (!auth.isLoggedIn) {
      items.value = []
      return
    }
    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: { 'Authorization': `Bearer ${auth.token}` }
      })
      if (res.ok) {
        const data = await res.json()
        items.value = data.items || []
      }
    } catch (err) {
      console.error('Failed to fetch cart', err)
    }
  }

  async function addToCart(bookId, quantity = 1) {
    if (!auth.isLoggedIn) {
      toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng!')
      // Optionally trigger the login modal opening here
      const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'))
      modal.show()
      return
    }

    try {
      const res = await fetch(`${API_URL}/cart/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({ bookId, quantity })
      })

      if (!res.ok) {
        throw new Error('Failed to add to cart')
      }

      toast.success('Đã thêm sản phẩm vào giỏ hàng!')
      await fetchCart() // Refresh cart from server
    } catch (err) {
      toast.error(err.message)
    }
  }

  // Fetch cart initially if logged in
  if (auth.isLoggedIn) {
    fetchCart()
  }

  return { items, totalItems, totalPrice, fetchCart, addToCart }
})
