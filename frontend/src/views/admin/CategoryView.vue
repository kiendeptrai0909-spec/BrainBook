<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 class="fs-3 mb-1 fw-bold text-primary">Danh mục</h1>
            </div>
            <div>
              <RouterLink to="/admin/create-category" class="btn btn-primary"
                >Thêm danh mục</RouterLink
              >
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="row g-2 mb-3 align-items-center">
            <div class="col-12 col-md-4 col-lg-3">
              <input type="text" class="form-control" placeholder="Tìm kiếm danh mục..." />
            </div>
            <div class="col-12 col-md">
              <div class="d-flex gap-2 justify-content-md-end flex-wrap">
                <button class="btn btn-outline-secondary"><i class="ti ti-filter"></i> Lọc</button>
                <button class="btn btn-outline-secondary">
                  <i class="ti ti-file-excel"></i> Excel
                </button>
                <button class="btn btn-outline-secondary">
                  <i class="ti ti-file-pdf"></i> PDF
                </button>
              </div>
            </div>
          </div>

          <div class="card table-responsive">
            <table class="table mb-0 text-nowrap table-hover">
              <thead class="table-light border-light">
                <tr>
                  <th>Tên</th>
                  <th>Slug</th>
                  <th>Sản phẩm</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="5" class="py-4 text-center text-muted">Đang tải dữ liệu...</td>
                </tr>

                <tr v-else-if="error">
                  <td colspan="5" class="py-4 text-center text-danger">{{ error }}</td>
                </tr>

                <tr v-else-if="categories.length === 0">
                  <td colspan="5" class="py-4 text-center text-muted">Chưa có danh mục nào.</td>
                </tr>

                <tr
                  v-for="category in categories"
                  :key="category.id || category._id"
                  class="align-middle"
                >
                  <td>{{ category.name }}</td>
                  <td>{{ category.slug }}</td>
                  <td>{{ category.productCount ?? category.productsCount ?? 0 }}</td>
                  <td>
                    <span
                      class="badge"
                      :class="category.isActive === false ? 'text-bg-secondary' : 'text-bg-success'"
                    >
                      {{ category.isActive === false ? 'Nháp' : 'Hoạt động' }}
                    </span>
                  </td>
                  <td>
                    <a href="#" class="" @click.prevent="handleEdit(category)">
                      <i class="ti ti-edit"></i>
                    </a>
                    <a href="#" class="link-danger" @click.prevent="handleDelete(category)">
                      <i class="ti ti-trash ms-2"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td class="border-bottom-0">Hiển thị danh mục mỗi trang</td>
                  <td colspan="4" class="border-bottom-0">
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
defineOptions({ name: 'CategoryView' })

import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getCategories } from '@/services/categoryService'

const categories = ref([])
const loading = ref(false)
const error = ref('')

async function loadCategories() {
  loading.value = true
  error.value = ''

  try {
    const response = await getCategories()
    categories.value = response?.data || response || []
  } catch (exception) {
    error.value = exception instanceof Error ? exception.message : 'Không tải được danh mục'
  } finally {
    loading.value = false
  }
}

function handleEdit(category) {
  console.log('Edit category:', category)
}

function handleDelete(category) {
  console.log('Delete category:', category)
}

onMounted(loadCategories)
</script>
