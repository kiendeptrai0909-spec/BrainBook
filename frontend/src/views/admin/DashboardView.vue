<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="mb-6">
            <h1 class="fs-3 mb-1 fw-bold text-primary">Bảng điều khiển</h1>
          </div>
        </div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-lg-3 col-12">
          <div
            class="card p-4 bg-primary bg-opacity-10 border border-primary border-opacity-25 rounded-2"
          >
            <div class="d-flex gap-3">
              <div class="icon-shape icon-md bg-primary text-white rounded-2">
                <i class="ti ti-report-analytics fs-4"></i>
              </div>
              <div>
                <h2 class="mb-3 fs-6">Tổng sản phẩm</h2>
                <h3 class="fw-bold mb-0">{{ totalBooks }}</h3>
                <p class="text-primary mb-0 small">Cập nhật từ API</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-12">
          <div
            class="card p-4 bg-success bg-opacity-10 border border-success border-opacity-25 rounded-2"
          >
            <div class="d-flex gap-3">
              <div class="icon-shape icon-md bg-success text-white rounded-2">
                <i class="ti ti-repeat fs-4"></i>
              </div>
              <div>
                <h2 class="mb-3 fs-6">Tổng danh mục</h2>
                <h3 class="fw-bold mb-0">{{ totalCategories }}</h3>
                <p class="text-success mb-0 small">Cập nhật từ API</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-12">
          <div
            class="card p-4 bg-info bg-opacity-10 border border-info border-opacity-25 rounded-2"
          >
            <div class="d-flex gap-3">
              <div class="icon-shape icon-md bg-info text-white rounded-2">
                <i class="ti ti-currency-dollar fs-4"></i>
              </div>
              <div>
                <h2 class="mb-3 fs-6">Sắp hết hàng</h2>
                <h3 class="fw-bold mb-0">{{ lowStockCount }}</h3>
                <p class="text-info mb-0 small">Ngưỡng: ≤ {{ lowStockThreshold }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-12">
          <div
            class="card p-4 bg-warning bg-opacity-10 border border-warning border-opacity-25 rounded-2"
          >
            <div class="d-flex gap-3">
              <div class="icon-shape icon-md bg-warning text-white rounded-2">
                <i class="ti ti-notes fs-4"></i>
              </div>
              <div>
                <h2 class="mb-3 fs-6">Hết hàng</h2>
                <h3 class="fw-bold mb-0">{{ outOfStockCount }}</h3>
                <p class="text-warning mb-0 small">Cập nhật từ API</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-lg-4 col-12">
          <div class="card shadow-sm border-0">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between border-bottom pb-4 mb-3">
                <div>
                  <h3 class="fw-bold h4 text-success">${{ stats.totalRevenue }}</h3>
                  <span class="text-muted small">Tổng doanh thu (Đã thanh toán)</span>
                </div>
                <div class="icon-shape bg-success bg-opacity-10 text-success rounded-3 p-3">
                  <i class="ti ti-currency-dollar fs-2"></i>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center small">
                <div class="text-muted">
                  Thực tế từ các đơn hàng PAID
                </div>
                <div><RouterLink to="/admin/orders" class="link-primary text-decoration-none fw-bold">Chi tiết</RouterLink></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-12">
          <div class="card shadow-sm border-0">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between border-bottom pb-4 mb-3">
                <div>
                  <h3 class="fw-bold h4 text-primary">{{ stats.totalOrders }}</h3>
                  <span class="text-muted small">Tổng số đơn hàng</span>
                </div>
                <div class="icon-shape bg-primary bg-opacity-10 text-primary rounded-3 p-3">
                  <i class="ti ti-shopping-cart fs-2"></i>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center small">
                <div class="text-muted">
                  Tất cả trạng thái
                </div>
                <div><RouterLink to="/admin/orders" class="link-primary text-decoration-none fw-bold">Quản lý</RouterLink></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-12">
          <div class="card shadow-sm border-0">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between border-bottom pb-4 mb-3">
                <div>
                  <h3 class="fw-bold h4 text-warning">{{ stats.statusCounts['PENDING'] || 0 }}</h3>
                  <span class="text-muted small">Đơn hàng đang chờ</span>
                </div>
                <div class="icon-shape bg-warning bg-opacity-10 text-warning rounded-3 p-3">
                  <i class="ti ti-clock fs-2"></i>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center small">
                <div class="text-muted">
                  Cần xử lý ngay
                </div>
                <div><RouterLink to="/admin/orders" class="link-primary text-decoration-none fw-bold">Xử lý</RouterLink></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-12 col-lg-6">
          <div class="card">
            <div
              class="card-header d-flex justify-content-between align-items-center bg-transparent px-4 py-3"
            >
              <h3 class="h5 mb-0">Doanh thu vs Mua hàng</h3>
              <div>
                <select class="form-select form-select-sm">
                  <option selected>Năm nay</option>
                  <option>Tháng này</option>
                  <option>Tuần này</option>
                </select>
              </div>
            </div>
            <div class="card-body p-4">
              <div id="salesPurchaseChart" ref="salesPurchaseChartEl"></div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-6">
          <div class="card">
            <div
              class="card-header d-flex justify-content-between align-items-center bg-transparent px-4 py-3"
            >
              <h3 class="h5 mb-0">Thông tin tổng quan</h3>
              <div>
                <select class="form-select form-select-sm">
                  <option selected>6 tháng gần đây</option>
                  <option>Tháng này</option>
                  <option>Tuần này</option>
                </select>
              </div>
            </div>
            <div class="card-body p-4">
              <h3 class="h6">Tổng quan khách hàng</h3>
              <div class="row align-items-center">
                <div class="col-sm-6">
                  <div id="customerChart" ref="customerChartEl"></div>
                </div>
                <div class="col-sm-6">
                  <div class="row">
                    <div class="col-6 border-end">
                      <div class="text-center">
                        <h2 class="mb-1">5.5K</h2>
                        <p class="text-success mb-2">Lần đầu</p>
                        <span class="badge bg-success"
                          ><i class="ti ti-arrow-up-left me-1"></i>25%</span
                        >
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="text-center">
                        <h2 class="mb-1">3.5K</h2>
                        <p class="text-warning mb-2">Quay lại</p>
                        <span class="badge bg-success badge-xs d-inline-flex align-items-center"
                          ><i class="ti ti-arrow-up-left me-1"></i>21%</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row text-center border-top mt-4 pt-4">
                <div class="col-4 border-end">
                  <h3 class="fw-bold mb-2">{{ totalBooks }}</h3>
                  <small class="text-secondary">Sản phẩm</small>
                </div>
                <div class="col-4 border-end">
                  <h3 class="fw-bold mb-2">{{ totalCategories }}</h3>
                  <small class="text-secondary">Danh mục</small>
                </div>
                <div class="col-4">
                  <h3 class="fw-bold mb-2">{{ lowStockCount }}</h3>
                  <small class="text-secondary">Sắp hết</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-3">
        <!-- CARD 1 — Top Selling Products -->
        <div class="col-lg-4">
          <div class="card h-100">
            <div
              class="card-header bg-white d-flex justify-content-between align-items-center px-4 py-3"
            >
              <h4 class="mb-0 h5">Sản phẩm bán chạy</h4>
              <button class="btn btn-sm btn-outline-secondary">
                <i class="ti ti-calendar"></i> Hôm nay
              </button>
            </div>

            <ul class="list-group list-group-flush">
              <li v-if="loading" class="list-group-item py-4 text-center text-muted">
                Đang tải dữ liệu...
              </li>
              <li v-else-if="error" class="list-group-item py-4 text-center text-danger">
                {{ error }}
              </li>
              <li
                v-else-if="topBooks.length === 0"
                class="list-group-item py-4 text-center text-muted"
              >
                Chưa có sản phẩm.
              </li>

              <li
                v-else
                v-for="book in topBooks"
                :key="book.id || book._id || book.slug"
                class="list-group-item d-flex align-items-center gap-3"
              >
                <img
                  :src="
                    book.imageUrl ||
                    book.images?.[0]?.url ||
                    '/admin-assets/assets/images/product-1.png'
                  "
                  class="rounded"
                  width="48"
                />
                <div class="flex-grow-1">
                  <p class="mb-1">{{ book.title || book.name || 'Sản phẩm' }}</p>
                  <div class="d-flex align-items-center gap-2 text-muted">
                    <small class="fw-semibold">${{ formatMoney(book.price) }}</small>
                    <small>•</small>
                    <small v-if="getStock(book) !== null">Còn {{ getStock(book) }}</small>
                    <small v-else>Không rõ tồn kho</small>
                  </div>
                </div>
                <span class="badge border" :class="stockBadgeClass(book)">
                  {{ stockBadgeText(book) }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <!-- CARD 2 — Low Stock Products -->
        <div class="col-lg-4">
          <div class="card h-100">
            <div
              class="card-header bg-white d-flex justify-content-between align-items-center px-4 py-3"
            >
              <div class="d-flex align-items-center">
                <h4 class="mb-0 h5">Sản phẩm sắp hết hàng</h4>
              </div>
              <a href="#" class="small text-primary text-decoration-underline">Xem tất cả</a>
            </div>

            <ul class="list-group list-group-flush">
              <li v-if="loading" class="list-group-item py-4 text-center text-muted">
                Đang tải dữ liệu...
              </li>
              <li v-else-if="error" class="list-group-item py-4 text-center text-danger">
                {{ error }}
              </li>
              <li
                v-else-if="lowStockBooks.length === 0"
                class="list-group-item py-4 text-center text-muted"
              >
                Không có sản phẩm sắp hết hàng.
              </li>

              <li
                v-else
                v-for="book in lowStockBooks"
                :key="book.id || book._id || book.slug"
                class="list-group-item d-flex align-items-center gap-3"
              >
                <img
                  :src="
                    book.imageUrl ||
                    book.images?.[0]?.url ||
                    '/admin-assets/assets/images/product-1.png'
                  "
                  class="rounded"
                  width="48"
                />
                <div class="flex-grow-1">
                  <p class="mb-1">{{ book.title || book.name || 'Sản phẩm' }}</p>
                  <small>ID: {{ book.id || book._id || '-' }}</small>
                </div>
                <div class="d-flex flex-column gap-0 align-items-center">
                  <span class="fw-semibold text-primary">{{ getStock(book) ?? '-' }}</span>
                  <small class="text-muted">Còn hàng</small>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- CARD 3 — Recent Sales -->
        <div class="col-lg-4">
          <div class="card h-100">
            <div
              class="card-header bg-white d-flex justify-content-between align-items-center px-4 py-3"
            >
              <h4 class="mb-0 h5">Bán hàng gần đây</h4>
              <button class="btn btn-sm btn-outline-secondary">
                <i class="ti ti-calendar-event"></i> Hàng tuần
              </button>
            </div>

            <ul class="list-group list-group-flush">
              <li v-if="loading" class="list-group-item py-4 text-center text-muted">
                Đang tải dữ liệu...
              </li>
              <li v-else-if="error" class="list-group-item py-4 text-center text-danger">
                {{ error }}
              </li>
              <li
                v-else-if="recentBooks.length === 0"
                class="list-group-item py-4 text-center text-muted"
              >
                Chưa có dữ liệu.
              </li>

              <li
                v-else
                v-for="book in recentBooks"
                :key="book.id || book._id || book.slug"
                class="list-group-item d-flex align-items-center gap-3"
              >
                <img
                  :src="
                    book.imageUrl ||
                    book.images?.[0]?.url ||
                    '/admin-assets/assets/images/product-1.png'
                  "
                  class="rounded"
                  width="48"
                />
                <div class="flex-grow-1">
                  <p class="mb-1">{{ book.title || book.name || 'Sản phẩm' }}</p>
                  <div class="d-flex align-items-center gap-2 text-muted">
                    <small class="fw-semibold">{{ book.author || book.authorName || '—' }}</small>
                    <small>•</small>
                    <small>${{ formatMoney(book.price) }}</small>
                  </div>
                </div>
                <span class="badge bg-primary-subtle text-primary">Mới</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import ApexCharts from 'apexcharts'

import { getBooks } from '@/services/booksService'
import { getCategories } from '@/services/categoryService'

const salesPurchaseChartEl = ref(null)
const customerChartEl = ref(null)

const loading = ref(false)
const error = ref('')

const books = ref([])
const categories = ref([])

const booksTotal = ref(0)
const categoriesTotal = ref(0)
const stats = ref({
  totalOrders: 0,
  totalRevenue: 0,
  statusCounts: {},
  recentRevenue: []
})

const lowStockThreshold = 10

function extractList(response) {
  const list =
    response?.data?.items || response?.data || response?.items || response?.results || response
  return Array.isArray(list) ? list : []
}

function extractTotal(response, fallbackCount) {
  const total = response?.data?.total ?? response?.total ?? response?.meta?.total
  return Number.isFinite(Number(total)) ? Number(total) : fallbackCount
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

function stockBadgeText(book) {
  const stock = getStock(book)
  if (stock === null) return '—'
  if (stock <= 0) return 'Hết'
  if (stock <= lowStockThreshold) return 'Sắp hết'
  return 'OK'
}

function stockBadgeClass(book) {
  const stock = getStock(book)
  if (stock === null) return 'bg-secondary-subtle text-secondary border-secondary'
  if (stock <= 0) return 'bg-danger-subtle text-danger border-danger'
  if (stock <= lowStockThreshold) return 'bg-warning-subtle text-warning border-warning'
  return 'bg-success-subtle text-success border-success'
}

function formatMoney(value) {
  const numberValue = Number(value)
  if (!Number.isFinite(numberValue)) return '0.00'
  return numberValue.toFixed(2)
}

const totalBooks = computed(() => booksTotal.value || books.value.length)
const totalCategories = computed(() => categoriesTotal.value || categories.value.length)

const lowStockBooks = computed(() => {
  return books.value
    .filter((b) => {
      const stock = getStock(b)
      return stock !== null && stock > 0 && stock <= lowStockThreshold
    })
    .slice(0, 5)
})

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
const recentBooks = computed(() => books.value.slice(0, 5))

let salesPurchaseChartInstance = null
let customerChartInstance = null

// Helper to group revenue by date
const revenueByDate = computed(() => {
  const dates = {}
  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(now.getDate() - i)
    dates[d.toISOString().split('T')[0]] = 0
  }

  stats.value.recentRevenue.forEach(item => {
    const date = new Date(item.createdAt).toISOString().split('T')[0]
    if (dates[date] !== undefined) {
      dates[date] += Number(item.total)
    }
  })

  return dates
})

const renderSalesPurchaseChart = () => {
  if (!salesPurchaseChartEl.value) return

  salesPurchaseChartInstance?.destroy()

  const dates = Object.keys(revenueByDate.value)
  const values = Object.values(revenueByDate.value)

  const options = {
    series: [
      {
        name: 'Revenue ($)',
        data: values,
      }
    ],
    colors: ['#E66239'],
    chart: {
      type: 'area',
      height: 350,
      width: '100%',
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: dates.map(d => {
        const date = new Date(d)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }),
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value}`,
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val}`,
      },
    },
  }

  salesPurchaseChartInstance = new ApexCharts(salesPurchaseChartEl.value, options)
  salesPurchaseChartInstance.render()
}

const renderCustomerChart = () => {
  if (!customerChartEl.value) return

  customerChartInstance?.destroy()

  const counts = stats.value.statusCounts
  const series = [
    counts['PENDING'] || 0,
    counts['COMPLETED'] || 0,
    counts['CANCELLED'] || 0
  ]

  const options = {
    series: series,
    chart: {
      height: 250,
      type: 'donut',
    },
    labels: ['Pending', 'Completed', 'Cancelled'],
    colors: ['#ffc107', '#198754', '#dc3545'],
    legend: { position: 'bottom' },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Orders',
              formatter: () => stats.value.totalOrders
            }
          }
        }
      }
    }
  }

  customerChartInstance = new ApexCharts(customerChartEl.value, options)
  customerChartInstance.render()
}

async function loadDashboardData() {
  loading.value = true
  error.value = ''
  try {
    const [booksResponse, categoriesResponse, statsResponse] = await Promise.all([
      getBooks({ page: 1, limit: 50 }),
      getCategories(),
      apiClient.get('/orders/stats')
    ])

    const bookList = extractList(booksResponse)
    books.value = bookList
    booksTotal.value = extractTotal(booksResponse, bookList.length)

    const categoryList = extractList(categoriesResponse)
    categories.value = categoryList
    categoriesTotal.value = extractTotal(categoriesResponse, categoryList.length)
    
    stats.value = statsResponse.data
  } catch (exception) {
    error.value = exception instanceof Error ? exception.message : 'Không tải được dữ liệu dashboard'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadDashboardData()
  renderSalesPurchaseChart()
  renderCustomerChart()
})

onUnmounted(() => {
  salesPurchaseChartInstance?.destroy()
  customerChartInstance?.destroy()
  salesPurchaseChartInstance = null
  customerChartInstance = null
})
</script>
