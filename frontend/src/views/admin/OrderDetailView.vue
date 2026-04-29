<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div
            class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3"
          >
            <div>
              <h1 class="fs-3 mb-1 fw-bold text-primary">Đơn hàng #{{ orderId }}</h1>
              <div class="text-secondary small">
                Mã khách hàng:
                <a href="#" class="link-primary text-decoration-none">2364847</a>
              </div>
            </div>

            <div class="d-flex gap-2 flex-wrap">
              <button type="button" class="btn btn-outline-secondary">
                <i class="ti ti-printer"></i> In
              </button>
              <button type="button" class="btn btn-outline-secondary">
                <i class="ti ti-rotate"></i> Hoàn tiền
              </button>
              <div class="dropdown">
                <button
                  type="button"
                  class="btn btn-outline-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Thao tác khác
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#">Nhân bản</a></li>
                  <li><a class="dropdown-item" href="#">Lưu trữ</a></li>
                  <li><a class="dropdown-item" href="#">Hủy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-3">
        <div class="col-12 col-lg-8">
          <div class="card table-responsive">
            <table class="table mb-0 text-nowrap table-hover">
              <thead class="table-light border-light">
                <tr>
                  <th>Sản phẩm</th>
                  <th class="text-end">Giá</th>
                  <th class="text-end">Số lượng</th>
                  <th class="text-end">Tổng</th>
                </tr>
              </thead>
              <tbody>
                <tr class="align-middle">
                  <td>
                    <div class="d-flex align-items-center gap-3">
                      <img
                        src="/admin-assets/assets/images/product-1.png"
                        alt=""
                        class="avatar avatar-md rounded"
                      />
                      <div>
                        <a href="#" class="link-primary text-decoration-none"> The Fine Print </a>
                        <div class="text-secondary small">Lauren Asher</div>
                      </div>
                    </div>
                  </td>
                  <td class="text-end">$28.99</td>
                  <td class="text-end">1</td>
                  <td class="text-end fw-semibold">$28.99</td>
                </tr>

                <tr class="align-middle">
                  <td>
                    <div class="d-flex align-items-center gap-3">
                      <img
                        src="/admin-assets/assets/images/product-2.png"
                        alt=""
                        class="avatar avatar-md rounded"
                      />
                      <div>
                        <a href="#" class="link-primary text-decoration-none"> Heartland Stars </a>
                        <div class="text-secondary small">Lauren Asher</div>
                      </div>
                    </div>
                  </td>
                  <td class="text-end">$25.00</td>
                  <td class="text-end">2</td>
                  <td class="text-end fw-semibold">$50.00</td>
                </tr>

                <tr class="align-middle">
                  <td>
                    <div class="d-flex align-items-center gap-3">
                      <img
                        src="/admin-assets/assets/images/product-3.png"
                        alt=""
                        class="avatar avatar-md rounded"
                      />
                      <div>
                        <a href="#" class="link-primary text-decoration-none"> Smart Watch Pro </a>
                        <div class="text-secondary small">Tech Pro</div>
                      </div>
                    </div>
                  </td>
                  <td class="text-end">$98.00</td>
                  <td class="text-end">1</td>
                  <td class="text-end fw-semibold">$98.00</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td class="border-bottom-0" colspan="3">
                    <span class="fw-semibold">Tạm tính sản phẩm:</span>
                  </td>
                  <td class="border-bottom-0 text-end fw-semibold">$176.99</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div class="row g-3 mt-1">
            <div class="col-12 col-md-4">
              <div class="card h-100">
                <div class="card-body p-4">
                  <h2 class="fs-5 mb-3">Thông tin thanh toán</h2>
                  <ul class="list-unstyled mb-0 small">
                    <li class="mb-2"><span class="text-secondary">Tên:</span> Carry</li>
                    <li class="mb-2"><span class="text-secondary">Họ:</span> Anna</li>
                    <li class="mb-2">
                      <span class="text-secondary">Email:</span>
                      <a href="#" class="link-primary text-decoration-none"
                        >carry.anna@example.com</a
                      >
                    </li>
                    <li class="mb-2">
                      <span class="text-secondary">Số điện thoại:</span> +84 912 345 678
                    </li>
                    <li class="mb-2"><span class="text-secondary">Quốc gia:</span> Việt Nam</li>
                    <li class="mb-2">
                      <span class="text-secondary">Tỉnh / Thành phố:</span> TP. Hồ Chí Minh
                    </li>
                    <li class="mb-0">
                      <span class="text-secondary">Địa chỉ:</span>
                      12 Nguyen Hue, District 1
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-4">
              <div class="card h-100">
                <div class="card-body p-4">
                  <h2 class="fs-5 mb-3">Thông tin giao hàng</h2>
                  <ul class="list-unstyled mb-0 small">
                    <li class="mb-2"><span class="text-secondary">Tên:</span> Carry</li>
                    <li class="mb-2"><span class="text-secondary">Họ:</span> Anna</li>
                    <li class="mb-2">
                      <span class="text-secondary">Email:</span>
                      <a href="#" class="link-primary text-decoration-none"
                        >carry.anna@example.com</a
                      >
                    </li>
                    <li class="mb-2">
                      <span class="text-secondary">Số điện thoại:</span> +84 912 345 678
                    </li>
                    <li class="mb-2"><span class="text-secondary">Quốc gia:</span> Việt Nam</li>
                    <li class="mb-2">
                      <span class="text-secondary">Tỉnh / Thành phố:</span> TP. Hồ Chí Minh
                    </li>
                    <li class="mb-0">
                      <span class="text-secondary">Địa chỉ:</span>
                      12 Nguyen Hue, District 1
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-4">
              <div class="card h-100">
                <div class="card-body p-4">
                  <h2 class="fs-5 mb-3">Thông tin khác</h2>
                  <ul class="list-unstyled mb-0 small">
                    <li class="mb-2">
                      <span class="text-secondary">Ghi chú đơn hàng (không bắt buộc):</span>
                      Gửi ở lễ tân
                    </li>
                    <li class="mb-0">
                      <span class="text-secondary">Phương thức thanh toán:</span>
                      Thanh toán khi nhận hàng (COD)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="card mb-3">
            <div class="card-body p-4">
              <h2 class="fs-5 mb-3">Tóm tắt</h2>
              <div class="d-flex justify-content-between mb-2 small">
                <span class="text-secondary">Tạm tính sản phẩm:</span>
                <span class="fw-semibold">$176.99</span>
              </div>
              <div class="d-flex justify-content-between mb-2 small">
                <span class="text-secondary">Giảm giá:</span>
                <span class="text-danger fw-semibold">-$10.00</span>
              </div>
              <div class="d-flex justify-content-between mb-2 small">
                <span class="text-secondary">Thuế:</span>
                <span class="fw-semibold">$12.60</span>
              </div>
              <div class="d-flex justify-content-between mb-2 small">
                <span class="text-secondary">Phí vận chuyển:</span>
                <span class="fw-semibold">$0.00</span>
              </div>
              <hr class="my-3" />
              <div class="d-flex justify-content-between align-items-center">
                <span class="fw-semibold">Tổng cộng:</span>
                <span class="fs-5 fw-bold">$179.59</span>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-body p-4">
              <h2 class="fs-5 mb-3">Trạng thái đơn hàng</h2>

              <div class="mb-3">
                <label class="form-label small text-secondary">Trạng thái thanh toán</label>
                <select class="form-select">
                  <option>Đang xử lý</option>
                  <option>Chờ xử lý</option>
                  <option>Hoàn tất</option>
                  <option>Thất bại</option>
                  <option>Đã hoàn tiền</option>
                </select>
              </div>

              <div>
                <label class="form-label small text-secondary">Trạng thái giao hàng</label>
                <select class="form-select">
                  <option>Chưa hoàn tất</option>
                  <option>Hoàn tất một phần</option>
                  <option>Đã hoàn tất</option>
                  <option>Đã hủy</option>
                  <option>Sẵn sàng nhận</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({ name: 'OrderDetailView' })

const route = useRoute()
const orderId = computed(() => route.params.id ?? '349')
</script>
