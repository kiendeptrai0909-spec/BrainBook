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
          <div class="card">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between border-bottom pb-5 mb-3">
                <div>
                  <h3 class="fw-bold h4">$25,458</h3>
                  <span>Tổng lợi nhuận</span>
                </div>
                <div>
                  <i class="ti ti-layers-subtract fs-1 text-primary"></i>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center small">
                <div class="text-muted">
                  <span class="text-success">+35%</span> so với tháng trước
                </div>
                <div><a href="#" class="link-primary text-decoration-underline">Xem</a></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-12">
          <div class="card">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between border-bottom pb-5 mb-3">
                <div>
                  <h3 class="fw-bold h4">$45,458</h3>
                  <span>Tổng tiền hoàn trả</span>
                </div>
                <div>
                  <i class="ti ti-credit-card fs-1 text-danger"></i>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center small">
                <div class="text-muted">
                  <span class="text-danger">-20%</span> so với tháng trước
                </div>
                <div><a href="#" class="link-primary text-decoration-underline">Xem</a></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-12">
          <div class="card">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between border-bottom pb-5 mb-3">
                <div>
                  <h3 class="fw-bold h4">$34,458</h3>
                  <span>Tổng chi phí</span>
                </div>
                <div>
                  <i class="ti ti-cash-banknote fs-1 text-warning"></i>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center small">
                <div class="text-muted">
                  <span class="text-warning">-20%</span> so với tháng trước
                </div>
                <div><a href="#" class="link-primary text-decoration-underline">Xem</a></div>
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

const renderSalesPurchaseChart = () => {
  if (!salesPurchaseChartEl.value) return

  salesPurchaseChartInstance?.destroy()

  const options = {
    series: [
      {
        name: 'Doanh thu',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: 'Mua hàng',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
    ],
    colors: ['#f7a085', '#E66239'],
    chart: {
      type: 'bar',
      height: 350,
      width: '100%',
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    grid: {
      show: true,
      borderColor: '#e2e8f0',
    },
    legend: {
      show: true,
      fontFamily: 'Poppins, serif',
      fontWeight: 500,
      markers: {
        size: 5,
        shape: 'square',
        strokeWidth: 0,
        offsetX: -2,
        offsetY: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '85%',
        borderRadius: 3,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: false,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [
        '28 Jan',
        '29 Jan',
        '30 Jan',
        '31 Jan',
        '1 Feb',
        '2 Feb',
        '3 Feb',
        '4 Feb',
        '5 Feb',
      ],
      axisBorder: {
        show: false,
        color: '#e2e8f0',
        height: 1,
        width: '100%',
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        show: false,
        borderType: 'solid',
        color: '#e2e8f0',
        height: 6,
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}k`,
      },
      title: {
        text: '$ (nghìn)',
      },
    },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val) => `$ ${val} nghìn`,
      },
    },
  }

  salesPurchaseChartInstance = new ApexCharts(salesPurchaseChartEl.value, options)
  salesPurchaseChartInstance.render()
}

const renderCustomerChart = () => {
  if (!customerChartEl.value) return

  customerChartInstance?.destroy()

  const options = {
    series: [44, 55],
    chart: {
      height: 200,
      type: 'radialBar',
    },
    colors: ['#5BE49B', '#E66239'],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { fontSize: '22px' },
          value: { fontSize: '16px' },
          total: { show: false },
        },
        hollow: {
          margin: 3,
          size: '40%',
          background: 'transparent',
          position: 'front',
          dropShadow: { enabled: false, top: 0, left: 0, blur: 3, opacity: 0.5 },
        },
        track: {
          show: true,
          background: '#f0f0f0',
          strokeWidth: '45%',
          opacity: 1,
          margin: 5,
          dropShadow: { enabled: false, top: 0, left: 0, blur: 3, opacity: 0.5 },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        gradientToColors: ['#007867', '#FFD666', '#FFAC82'],
        stops: [0, 100],
      },
    },
    stroke: { lineCap: 'round' },
    labels: ['Lần đầu', 'Quay lại'],
  }

  customerChartInstance = new ApexCharts(customerChartEl.value, options)
  customerChartInstance.render()
}

async function loadDashboardData() {
  loading.value = true
  error.value = ''
  try {
    const [booksResponse, categoriesResponse] = await Promise.all([
      getBooks({ page: 1, limit: 50 }),
      getCategories(),
    ])

    const bookList = extractList(booksResponse)
    books.value = bookList

    booksTotal.value = extractTotal(booksResponse, bookList.length)

    const categoryList = extractList(categoriesResponse)
    categories.value = categoryList

    categoriesTotal.value = extractTotal(categoriesResponse, categoryList.length)
  } catch (exception) {
    error.value =
      exception instanceof Error ? exception.message : 'Không tải được dữ liệu dashboard'
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
