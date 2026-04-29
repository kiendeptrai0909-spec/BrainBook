<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div
            class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3"
          >
            <div>
              <h1 class="fs-3 mb-1 fw-bold text-primary">Đơn hàng</h1>
            </div>
            <div class="d-flex gap-2">
              <button type="button" class="btn btn-outline-secondary">
                <i class="ti ti-file-export"></i> Xuất
              </button>
              <button type="button" class="btn btn-primary">
                <i class="ti ti-plus"></i> Thêm đơn hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
              <a class="nav-link active" href="#">Tất cả</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Chờ thanh toán</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Chưa hoàn tất</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Hoàn tất</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Hoàn tiền</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Thất bại</a>
            </li>
          </ul>

          <div class="row g-2 mb-3 align-items-center">
            <div class="col-12 col-md-4 col-lg-3">
              <div class="input-group">
                <span class="input-group-text bg-white">
                  <i class="ti ti-search"></i>
                </span>
                <input type="text" class="form-control" placeholder="Tìm kiếm đơn hàng..." />
              </div>
            </div>

            <div class="col-12 col-md">
              <div class="d-flex gap-2 justify-content-md-end flex-wrap">
                <div class="dropdown">
                  <button
                    class="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Phương thức thanh toán
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Thanh toán khi nhận hàng (COD)</a></li>
                    <li><a class="dropdown-item" href="#">Chuyển khoản ngân hàng</a></li>
                    <li><a class="dropdown-item" href="#">PayPal / Thẻ tín dụng</a></li>
                  </ul>
                </div>

                <div class="dropdown">
                  <button
                    class="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Bộ lọc khác
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Quốc gia</a></li>
                    <li><a class="dropdown-item" href="#">Tỉnh / Thành phố</a></li>
                    <li><a class="dropdown-item" href="#">Ngày</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="card table-responsive">
            <div v-if="loading" class="text-center p-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <table v-else class="table mb-0 text-nowrap table-hover">
              <thead class="table-light border-light">
                <tr>
                  <th>
                    <div class="form-check mb-0">
                      <input class="form-check-input" type="checkbox" aria-label="Chọn tất cả" />
                    </div>
                  </th>
                  <th>Đơn hàng</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái thanh toán</th>
                  <th>Trạng thái đơn hàng</th>
                  <th>Ngày</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="orders.length === 0">
                  <td colspan="7" class="text-center py-4 text-muted">Chưa có đơn hàng nào.</td>
                </tr>
                <tr v-for="order in orders" :key="order.id" class="align-middle">
                  <td>
                    <div class="form-check mb-0">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :aria-label="`Chọn đơn hàng ${order.orderNumber}`"
                      />
                    </div>
                  </td>
                  <td>
                    <RouterLink :to="`/admin/orders/${order.orderNumber}`" class="link-primary text-decoration-none">
                      {{ order.orderNumber }}
                    </RouterLink>
                  </td>
                  <td>${{ order.total }}</td>
                  <td>
                    <span 
                      class="badge" 
                      :class="{
                        'text-bg-success': order.paymentStatus === 'COMPLETED',
                        'text-bg-warning': order.paymentStatus === 'PENDING',
                        'text-bg-danger': order.paymentStatus === 'FAILED' || order.paymentStatus === 'REFUNDED',
                        'text-bg-secondary': !['COMPLETED', 'PENDING', 'FAILED', 'REFUNDED'].includes(order.paymentStatus)
                      }"
                    >
                      {{ getPaymentStatusText(order.paymentStatus) }}
                    </span>
                  </td>
                  <td>
                    <span 
                      class="badge" 
                      :class="{
                        'text-bg-success': order.status === 'COMPLETED' || order.status === 'DELIVERED',
                        'text-bg-info': order.status === 'PROCESSING' || order.status === 'SHIPPED',
                        'text-bg-warning': order.status === 'PENDING',
                        'text-bg-danger': order.status === 'CANCELLED' || order.status === 'FAILED',
                        'text-bg-secondary': !['COMPLETED', 'DELIVERED', 'PROCESSING', 'SHIPPED', 'PENDING', 'CANCELLED', 'FAILED'].includes(order.status)
                      }"
                    >
                      {{ getOrderStatusText(order.status) }}
                    </span>
                  </td>
                  <td>{{ formatDate(order.createdAt) }}</td>
                  <td>
                    <a href="#" class=""><i class="ti ti-edit"></i></a>
                    <a href="#" class="link-danger"><i class="ti ti-trash ms-2"></i></a>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td class="border-bottom-0" colspan="2">Tổng số: {{ orders.length }} đơn hàng</td>
                  <td colspan="5" class="border-bottom-0">
                    <nav aria-label="Điều hướng trang" class="d-flex justify-content-end">
                      <ul class="pagination mb-0">
                        <li class="page-item disabled">
                          <a class="page-link" href="#" tabindex="-1">Trước</a>
                        </li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                          <a class="page-link" href="#">Sau</a>
                        </li>
                      </ul>
                    </nav>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
defineOptions({ name: 'OrderView' })

import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getOrders } from '@/services/ordersService'
import { toast } from 'vue3-toastify'

const orders = ref([])
const loading = ref(false)

const loadOrders = async () => {
  loading.value = true
  try {
    const data = await getOrders()
    orders.value = data || []
  } catch (error) {
    console.error('Failed to load orders', error)
    toast.error('Lỗi khi tải danh sách đơn hàng')
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('vi-VN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date)
}

const getPaymentStatusText = (status) => {
  const map = {
    'COMPLETED': 'Hoàn tất',
    'PENDING': 'Chờ xử lý',
    'FAILED': 'Thất bại',
    'REFUNDED': 'Hoàn tiền',
    'UNKNOWN': 'Không rõ'
  }
  return map[status] || status
}

const getOrderStatusText = (status) => {
  const map = {
    'PENDING': 'Chờ xác nhận',
    'PROCESSING': 'Đang xử lý',
    'SHIPPED': 'Đang giao',
    'DELIVERED': 'Đã giao',
    'COMPLETED': 'Hoàn tất',
    'CANCELLED': 'Đã hủy',
    'FAILED': 'Thất bại'
  }
  return map[status] || status
}

onMounted(() => {
  loadOrders()
})
</script>
