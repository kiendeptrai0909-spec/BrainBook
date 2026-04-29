<template>
  <!-- MAIN CONTENT -->
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="">
              <h1 class="fs-3 mb-1 fw-bold text-primary">Báo cáo</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-3 mb-3">
        <!-- Stat cards -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100">
            <div class="card-body p-4">
              <h6 class="mb-4">Tổng sản phẩm</h6>
              <h3 class="mb-1 fw-bold">{{ totalBooks }}</h3>
              <p class="mb-0 text-success small"><i class="ti ti-check"> </i>Từ API</p>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100">
            <div class="card-body p-4">
              <h6 class="mb-4">Tổng danh mục</h6>
              <h3 class="mb-1 fw-bold">{{ totalCategories }}</h3>
              <p class="mb-0 text-success small"><i class="ti ti-check"> </i>Từ API</p>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100">
            <div class="card-body p-4">
              <h6 class="mb-4">Sản phẩm sắp hết hàng</h6>
              <h3 class="mb-1 fw-bold">{{ lowStockCount }}</h3>
              <p class="mb-0 text-danger small"><i class="ti ti-alert-triangle"> </i>Ngưỡng ≤ 10</p>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <div class="card h-100">
            <div class="card-body p-4">
              <h6 class="mb-4">Hết hàng</h6>
              <h3 class="mb-1 fw-bold">{{ outOfStockCount }}</h3>
              <p class="mb-0 text-danger small"><i class="ti ti-check"> </i>Từ API</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <!-- Sales Overview (full width) -->
        <div class="col-12">
          <div class="card">
            <div class="card-body p-4">
              <div
                class="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3 gap-2"
              >
                <div>
                  <h2 class="mb-0 fs-5">Tổng quan doanh số</h2>
                </div>
                <div class="controls">
                  <button id="btn-random" class="btn btn-light btn-sm">Ngẫu nhiên dữ liệu</button>
                  <button id="btn-update" class="btn btn-primary btn-sm">
                    Chỉ hiển thị năm nay
                  </button>
                </div>
              </div>

              <!-- Chart placeholder: replace with canvas or chart container when integrating chart library -->

              <div id="salesChart"></div>

              <div class="d-flex justify-content-end">
                <a href="#" class="small">Xem báo cáo chi tiết</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- Top Products -->
        <div class="col-12">
          <div class="card">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h2 class="mb-0 fs-5">Sản phẩm bán chạy</h2>
                </div>
              </div>

              <!-- Product rows -->
              <div class="list-group list-group-flush">
                <div v-if="loading" class="list-group-item p-3 text-center text-muted">
                  Đang tải dữ liệu...
                </div>
                <div v-else-if="error" class="list-group-item p-3 text-center text-danger">
                  {{ error }}
                </div>
                <div
                  v-else-if="topBooks.length === 0"
                  class="list-group-item p-3 text-center text-muted"
                >
                  Chưa có sản phẩm.
                </div>

                <div
                  v-else
                  v-for="book in topBooks"
                  :key="book.id || book._id || book.slug"
                  class="list-group-item p-3 d-flex align-items-center"
                >
                  <div class="me-3">
                    <img
                      :src="
                        book.imageUrl ||
                        book.images?.[0]?.url ||
                        '/admin-assets/assets/images/product-1.png'
                      "
                      :alt="book.title || book.name || 'Sản phẩm'"
                      class="rounded"
                      style="width: 48px; height: 48px; object-fit: cover"
                    />
                  </div>
                  <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 class="mb-0">{{ book.title || book.name || 'Sản phẩm' }}</h6>
                        <small class="text-secondary">{{
                          book.author || book.authorName || '—'
                        }}</small>
                      </div>
                      <div class="text-end">
                        <strong>${{ formatMoney(book.price) }}</strong>
                      </div>
                    </div>
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
import { computed, onMounted, ref } from 'vue'

import { getBooks } from '@/services/booksService'
import { getCategories } from '@/services/categoryService'

const loading = ref(false)
const error = ref('')

const books = ref([])
const categories = ref([])

const lowStockThreshold = 10

function extractList(response) {
  const list =
    response?.data?.items || response?.data || response?.items || response?.results || response
  return Array.isArray(list) ? list : []
}

function getStock(book) {
  const candidates = [
    book?.stock,
    book?.quantity,
    book?.stockQuantity,
    book?.inventory,
    book?.availableQuantity,
  ]
  const value = candidates.find((v) => v !== undefined && v !== null && v !== '')
  if (value === undefined) return null
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : null
}

function formatMoney(value) {
  const numberValue = Number(value)
  if (!Number.isFinite(numberValue)) return '0.00'
  return numberValue.toFixed(2)
}

const totalBooks = computed(() => books.value.length)
const totalCategories = computed(() => categories.value.length)

const outOfStockCount = computed(() => {
  return books.value.filter((b) => getStock(b) === 0).length
})

const lowStockCount = computed(() => {
  return books.value.filter((b) => {
    const stock = getStock(b)
    return stock !== null && stock > 0 && stock <= lowStockThreshold
  }).length
})

const topBooks = computed(() => books.value.slice(0, 5))

async function loadReportsData() {
  loading.value = true
  error.value = ''
  try {
    const [booksResponse, categoriesResponse] = await Promise.all([
      getBooks({ page: 1, limit: 50 }),
      getCategories(),
    ])
    books.value = extractList(booksResponse)
    categories.value = extractList(categoriesResponse)
  } catch (exception) {
    error.value = exception instanceof Error ? exception.message : 'Không tải được dữ liệu báo cáo'
  } finally {
    loading.value = false
  }
}

onMounted(loadReportsData)
</script>
