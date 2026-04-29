<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div
            class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3"
          >
            <div class="">
              <h1 class="fs-3 mb-1 fw-bold text-primary">Thêm sản phẩm</h1>
            </div>
            <div>
              <RouterLink :to="{ name: 'admin-products' }" class="btn btn-outline-primary">Về danh sách sản phẩm</RouterLink>
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
                    <label for="productName" class="form-label">Tên sản phẩm <span class="text-danger">*</span></label>
                    <input
                      v-model="form.title"
                      type="text"
                      class="form-control"
                      id="productName"
                      placeholder="Nhập tên sản phẩm"
                      required
                    />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="productSKU" class="form-label">SKU <span class="text-danger">*</span></label>
                    <input
                      v-model="form.sku"
                      type="text"
                      class="form-control"
                      id="productSKU"
                      placeholder="Nhập SKU"
                      required
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="productPrice" class="form-label">Giá <span class="text-danger">*</span></label>
                    <input
                      v-model.number="form.price"
                      type="number"
                      class="form-control"
                      id="productPrice"
                      placeholder="0.00"
                      step="0.01"
                      required
                    />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="productStock" class="form-label">Số lượng tồn kho <span class="text-danger">*</span></label>
                    <input
                      v-model.number="form.stock"
                      type="number"
                      class="form-control"
                      id="productStock"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label for="productCategory" class="form-label">Danh mục (ID)</label>
                  <input
                    v-model.number="form.categoryId"
                    type="number"
                    class="form-control"
                    id="productCategory"
                    placeholder="Nhập ID danh mục (Tùy chọn)"
                  />
                  <small class="text-muted">Ví dụ: 1 cho Romance, 2 cho Fiction...</small>
                </div>
                
                <div class="mb-3">
                  <label for="productImage" class="form-label">Hình ảnh sản phẩm</label>
                  <input
                    type="file"
                    class="form-control"
                    id="productImage"
                    accept="image/*"
                    @change="handleFileChange"
                  />
                  <div v-if="imagePreview" class="mt-2">
                    <img :src="imagePreview" alt="Preview" class="img-thumbnail" style="max-height: 200px;" />
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="productDescription" class="form-label">Mô tả</label>
                  <textarea
                    v-model="form.description"
                    class="form-control"
                    id="productDescription"
                    rows="4"
                    placeholder="Nhập mô tả sản phẩm"
                  ></textarea>
                </div>
                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    {{ loading ? 'Đang lưu...' : 'Thêm sản phẩm' }}
                  </button>
                  <button type="button" class="btn btn-secondary" @click="resetForm" :disabled="loading">Xóa form</button>
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
import { createBook, uploadImage } from '@/services/booksService'
import { toast } from 'vue3-toastify'

const router = useRouter()

const loading = ref(false)
const selectedFile = ref(null)
const imagePreview = ref(null)

const initialForm = {
  title: '',
  sku: '',
  price: null,
  stock: null,
  categoryId: null,
  description: '',
}

const form = reactive({ ...initialForm })

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    selectedFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  } else {
    selectedFile.value = null
    imagePreview.value = null
  }
}

const resetForm = () => {
  Object.assign(form, initialForm)
  selectedFile.value = null
  imagePreview.value = null
  document.getElementById('productImage').value = ''
}

const handleSubmit = async () => {
  if (!form.title || !form.sku || form.price === null || form.stock === null) {
    toast.warning('Vui lòng điền đầy đủ các trường bắt buộc')
    return
  }

  loading.value = true
  try {
    let imageUrl = ''
    
    // 1. Upload image if selected
    if (selectedFile.value) {
      toast.info('Đang tải ảnh lên...', { autoClose: 1500 })
      const uploadRes = await uploadImage(selectedFile.value)
      imageUrl = uploadRes.url
    }

    // 2. Create product
    const payload = {
      title: form.title,
      sku: form.sku,
      price: Number(form.price),
      stock: Number(form.stock),
      description: form.description,
      imageUrl: imageUrl
    }

    if (form.categoryId) {
      payload.categoryIds = [Number(form.categoryId)]
    }

    await createBook(payload)
    toast.success('Thêm sản phẩm thành công!')
    router.push({ name: 'admin-products' })
  } catch (error) {
    console.error('Error creating product:', error)
    toast.error(error.message || 'Lỗi khi thêm sản phẩm')
  } finally {
    loading.value = false
  }
}
</script>
