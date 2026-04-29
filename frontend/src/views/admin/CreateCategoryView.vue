<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div
            class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3"
          >
            <div>
              <h1 class="fs-3 mb-1 fw-bold text-primary">Thêm danh mục</h1>
            </div>
            <div>
              <RouterLink to="/admin/categories" class="btn btn-outline-primary"
                >Về danh sách danh mục</RouterLink
              >
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body p-4">
              <form @submit.prevent="handleSubmit">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="categoryName" class="form-label"
                      >Tên danh mục <span class="text-danger">*</span></label
                    >
                    <input
                      id="categoryName"
                      v-model="form.name"
                      type="text"
                      class="form-control"
                      placeholder="Nhập tên danh mục"
                      required
                    />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="categorySlug" class="form-label">Slug</label>
                    <input
                      id="categorySlug"
                      v-model="form.slug"
                      type="text"
                      class="form-control"
                      placeholder="Nhập slug (không bắt buộc)"
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label for="categoryDescription" class="form-label">Mô tả</label>
                  <textarea
                    id="categoryDescription"
                    v-model="form.description"
                    class="form-control"
                    rows="4"
                    placeholder="Nhập mô tả danh mục"
                  ></textarea>
                </div>

                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary" :disabled="loading">
                    <span
                      v-if="loading"
                      class="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {{ loading ? 'Đang lưu...' : 'Thêm danh mục' }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="resetForm"
                    :disabled="loading"
                  >
                    Xóa form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { createCategory } from '@/services/categoryService'
import { toast } from 'vue3-toastify'

const router = useRouter()
const loading = ref(false)

const initialForm = {
  name: '',
  slug: '',
  description: '',
}

const form = reactive({ ...initialForm })

const resetForm = () => {
  Object.assign(form, initialForm)
}

const handleSubmit = async () => {
  if (!form.name) {
    toast.warning('Vui lòng nhập tên danh mục')
    return
  }

  loading.value = true
  try {
    const payload = {
      name: form.name,
      slug: form.slug || undefined,
      description: form.description || undefined,
    }

    await createCategory(payload)
    toast.success('Thêm danh mục thành công!')
    router.push('/admin/categories')
  } catch (error) {
    console.error('Error creating category:', error)
    toast.error(error.message || 'Lỗi khi thêm danh mục')
  } finally {
    loading.value = false
  }
}
</script>
