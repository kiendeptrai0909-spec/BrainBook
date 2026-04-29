<template>
  <div class="checkout-page mt-5 py-5">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="display-6 fw-bold text-primary">Checkout</h2>
        <p class="text-dark">Please fill in your details to complete your order.</p>
      </div>

      <div v-if="loading" class="text-center py-5">Loading...</div>
      <div v-else-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
      <div v-else>
        <form @submit.prevent="placeOrder">
          <div class="row g-5">
            <div class="col-lg-7">
              <h4 class="fw-bold mb-4 text-primary border-bottom pb-2">Billing Details</h4>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-medium text-primary"
                    >First Name <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="form.customerFirstName"
                    type="text"
                    class="form-control p-3 rounded-3 custom-input"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-medium text-primary"
                    >Last Name <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="form.customerLastName"
                    type="text"
                    class="form-control p-3 rounded-3 custom-input"
                    required
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-medium text-primary"
                    >Email Address <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="form.customerEmail"
                    type="email"
                    class="form-control p-3 rounded-3 custom-input"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-medium text-primary"
                    >Phone Number <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="form.customerPhone"
                    type="tel"
                    class="form-control p-3 rounded-3 custom-input"
                    required
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-medium text-primary"
                    >Country <span class="text-danger">*</span></label
                  >
                  <select
                    v-model="form.countryCode"
                    class="form-select p-3 rounded-3 custom-input"
                    required
                  >
                    <option value="" disabled>Select a country...</option>
                    <option value="VN">Vietnam</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-medium text-primary"
                    >Town / City <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="form.city"
                    type="text"
                    class="form-control p-3 rounded-3 custom-input"
                    required
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-medium text-primary"
                  >Street Address <span class="text-danger">*</span></label
                >
                <input
                  v-model="form.addressLine1"
                  type="text"
                  class="form-control p-3 rounded-3 custom-input mb-2"
                  placeholder="House number and street name"
                  required
                />
                <input
                  v-model="form.addressLine2"
                  type="text"
                  class="form-control p-3 rounded-3 custom-input"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                />
              </div>

              <div class="mb-5">
                <label class="form-label fw-medium text-primary">Order Notes (optional)</label>
                <textarea
                  v-model="form.orderNotes"
                  class="form-control p-3 rounded-3 custom-input"
                  rows="4"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                ></textarea>
              </div>

              <h4 class="fw-bold mb-4 text-primary border-bottom pb-2">Payment Method</h4>
              <div class="payment-methods bg-light p-4 rounded-3 border">
                <div class="form-check mb-3 p-3 rounded-3">
                  <input
                    v-model="form.paymentMethod"
                    class="form-check-input custom-radio"
                    type="radio"
                    name="paymentMethod"
                    id="cod"
                    value="COD"
                  />
                  <label class="form-check-label fw-bold text-dark fs-5" for="cod">
                    Cash on Delivery (COD)
                  </label>
                  <p class="text-primary small mt-1 mb-0">Pay with cash upon delivery.</p>
                </div>

                <div class="form-check mb-3 p-3 rounded-3">
                  <input
                    v-model="form.paymentMethod"
                    class="form-check-input custom-radio"
                    type="radio"
                    name="paymentMethod"
                    id="bank"
                    value="BANK_TRANSFER"
                  />
                  <label class="form-check-label fw-bold text-dark fs-5" for="bank">
                    Direct Bank Transfer
                  </label>
                  <p class="text-primary small mt-1 mb-0">
                    Make your payment directly into our bank account. Your order will not be shipped
                    until the funds have cleared.
                  </p>
                </div>

                <div class="form-check p-3 rounded-3">
                  <input
                    v-model="form.paymentMethod"
                    class="form-check-input custom-radio"
                    type="radio"
                    name="paymentMethod"
                    id="paypal"
                    value="PAYPAL"
                  />
                  <label class="form-check-label fw-bold text-dark fs-5" for="paypal">
                    PayPal / Credit Card
                  </label>
                  <p class="text-primary small mt-1 mb-0">Pay via PayPal or credit card.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-5">
              <div
                class="order-summary card border-0 rounded-4 shadow-sm"
                style="background-color: #fcfcfc; border: 1px solid #eee !important"
              >
                <div class="card-body p-4 p-lg-5">
                  <h4 class="fw-bold mb-4 text-primary border-bottom pb-3">Your Order</h4>

                  <div
                    v-for="item in cart.items"
                    :key="item.id"
                    class="d-flex justify-content-between align-items-center mb-3"
                  >
                    <div class="d-flex align-items-center">
                      <img :src="item.image" alt="Book" width="50" class="rounded-2 border" />
                      <div class="ms-3">
                        <h6 class="mb-0 fw-bold text-dark">{{ item.name }}</h6>
                        <small class="text-primary">{{ item.author }}</small>
                      </div>
                    </div>
                    <div class="text-end">
                      <small class="text-primary d-block">QTY: {{ item.quantity }}</small>
                      <span class="fw-medium text-dark"
                        >${{ (item.price * item.quantity).toFixed(2) }}</span
                      >
                    </div>
                  </div>

                  <div class="border-top border-bottom py-3 mb-4">
                    <div class="d-flex justify-content-between mb-2">
                      <span class="text-primary">Subtotal</span>
                      <span class="fw-medium text-dark">${{ cartSubtotal.toFixed(2) }}</span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span class="text-primary">Shipping</span>
                      <span class="fw-medium text-dark">${{ shippingAmount.toFixed(2) }}</span>
                    </div>
                  </div>

                  <div class="d-flex justify-content-between mb-5 align-items-end">
                    <span class="fs-5 fw-bold text-primary">Total</span>
                    <span class="fs-3 fw-bold" style="color: #f07c82 !important"
                      >${{ cartTotal.toFixed(2) }}</span
                    >
                  </div>

                  <button
                    type="submit"
                    class="btn btn-place-order w-100 rounded-3 fw-bold fs-5 d-flex justify-content-center align-items-center"
                    :disabled="isProcessing"
                  >
                    <span v-if="!isProcessing">Place Order</span>
                    <span v-else>
                      <span
                        class="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </span>
                  </button>

                  <p class="text-center text-primary small mt-3 mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      class="bi bi-shield-lock-fill me-1 mb-1"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"
                      />
                    </svg>
                    Secure SSL Checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiGet, apiPost, apiDelete } from '@/lib/api'

const router = useRouter()
const isProcessing = ref(false)

const loading = ref(false)
const error = ref('')

const cart = ref({ items: [], subtotal: 0 })

const shippingAmount = computed(() => 5)
const cartSubtotal = computed(() => cart.value?.subtotal ?? 0)
const cartTotal = computed(() => cartSubtotal.value + shippingAmount.value)

const form = ref({
  paymentMethod: 'COD',
  customerFirstName: '',
  customerLastName: '',
  customerEmail: '',
  customerPhone: '',
  countryCode: 'VN',
  city: '',
  addressLine1: '',
  addressLine2: '',
  orderNotes: '',
  couponCode: '',
})

const loadCart = async () => {
  loading.value = true
  error.value = ''
  try {
    cart.value = await apiGet('/cart', { includeSession: true })
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load cart'
  } finally {
    loading.value = false
  }
}

const placeOrder = async () => {
  if (isProcessing.value) return
  isProcessing.value = true

  try {
    const items = (cart.value.items ?? []).map((i) => ({ bookId: i.id, quantity: i.quantity }))
    if (!items.length) throw new Error('Giỏ hàng trống!')

    const payload = {
      items,
      paymentMethod: form.value.paymentMethod,
      shippingAmount: shippingAmount.value,
      shippingLabel: 'Giao hàng tiêu chuẩn',
      customerFirstName: form.value.customerFirstName,
      customerLastName: form.value.customerLastName,
      customerEmail: form.value.customerEmail,
      customerPhone: form.value.customerPhone,
      countryCode: form.value.countryCode,
      city: form.value.city,
      addressLine1: form.value.addressLine1,
      addressLine2: form.value.addressLine2 || undefined,
      orderNotes: form.value.orderNotes || undefined,
      couponCode: form.value.couponCode || undefined,
    }

    // 1. Gọi API tạo đơn hàng
    const orderResponse = await apiPost('/orders', { body: payload })
    const orderNumber = orderResponse.orderNumber

    // 2. [QUAN TRỌNG] Dọn dẹp giỏ hàng trong Database
    // Lặp qua từng món và gọi API xóa
    for (const item of items) {
      await apiDelete(`/cart/items/${item.bookId}`)
    }
    // Làm trống giỏ hàng trên giao diện
    cart.value.items = []

    // 3. XỬ LÝ ĐIỀU HƯỚNG
    if (form.value.paymentMethod === 'COD') {
      router.push(`/success?ref=${orderNumber}`)
    } else if (form.value.paymentMethod === 'BANK_TRANSFER') {
      router.push(`/success?ref=${orderNumber}`)
    } else if (form.value.paymentMethod === 'PAYPAL') {
      alert('Đang kết nối với cổng thanh toán PayPal...')
      router.push(`/success?ref=${orderNumber}`)
    }
  } catch (e) {
    console.error('Checkout error:', e)
    const errorMsg = e.response?.data?.message || e.message || 'Đã có lỗi xảy ra khi đặt hàng'
    alert(errorMsg)
  } finally {
    isProcessing.value = false
  }
}

onMounted(loadCart)
</script>

<style scoped>
/* Reset màu viền input */
.custom-input {
  border: 1px solid #e0e0e0;
  background-color: #fff;
  transition: all 0.2s ease;
}

/* Đổi màu viền sang hồng cam khi user click vào ô nhập */
.custom-input:focus {
  border-color: #f07c82;
  box-shadow: 0 0 0 0.25rem rgba(240, 124, 130, 0.25);
  outline: none;
}

/* Đổi màu Radio button sang hồng cam */
.custom-radio:checked {
  background-color: #f07c82;
  border-color: #f07c82;
}
.custom-radio:focus {
  box-shadow: 0 0 0 0.25rem rgba(240, 124, 130, 0.25);
}

/* Style cho phương thức thanh toán được chọn */
.cod-method {
  border: 1px solid #f07c82 !important;
  background-color: #fff !important;
}

/* Style cho nút Place Order */
.btn-place-order {
  height: 55px;
  background-color: #f07c82 !important; /* Màu hồng cam chủ đạo */
  color: #fff !important;
  border: none !important;
  transition: all 0.3s ease !important;
}

.btn-place-order:hover:not(:disabled) {
  background-color: #222222 !important; /* Hover sang màu đen */
  color: #fff !important;
}

/* Làm mờ nút khi đang Processing */
.btn-place-order:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}
</style>
