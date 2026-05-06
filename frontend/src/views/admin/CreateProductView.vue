<template>
  <main id="content" class="content py-10">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div
            class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3"
          >
            <div class="">
              <h1 class="fs-3 mb-1 fw-bold text-primary">{{ isEdit ? 'Chỉnh sửa' : 'Thêm' }} sản phẩm</h1>
            </div>
            <div>
              <RouterLink :to="{ name: 'admin-products' }" class="btn btn-outline-primary"
                >Về danh sách sản phẩm</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div v-if="fetching" class="card-body p-5 text-center">
              <div class="spinner-border text-primary" role="status"></div>
            </div>
            <div v-else class="card-body p-4">
              <form @submit.prevent="handleSubmit">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="productName" class="form-label"
                      >Tên sản phẩm <span class="text-danger">*</span></label
                    >
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
                    <label for="productSKU" class="form-label"
                      >SKU <span class="text-danger">*</span></label
                    >
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
                  <div class="col-md-4 mb-3">
                    <label for="productPrice" class="form-label"
                      >Giá <span class="text-danger">*</span></label
                    >
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
                  <div class="col-md-4 mb-3">
                    <label for="compareAtPrice" class="form-label">Giá niêm yết (Gốc)</label>
                    <input
                      v-model.number="form.compareAtPrice"
                      type="number"
                      class="form-control"
                      id="compareAtPrice"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="productStock" class="form-label"
                      >Số lượng tồn kho <span class="text-danger">*</span></label
                    >
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

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="productAuthor" class="form-label"
                      >Tác giả <span class="text-danger">*</span></label
                    >
                    <input
                      v-model.trim="form.authorName"
                      type="text"
                      class="form-control"
                      id="productAuthor"
                      placeholder="Nhập tên tác giả"
                      required
                    />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="productPublisher" class="form-label"
                      >Nhà xuất bản</label
                    >
                    <input
                      v-model.trim="form.publisherName"
                      type="text"
                      class="form-control"
                      id="productPublisher"
                      placeholder="Nhập tên nhà xuất bản"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-3 mb-3">
                    <label for="format" class="form-label">Định dạng</label>
                    <input
                      v-model.trim="form.format"
                      type="text"
                      class="form-control"
                      id="format"
                      placeholder="VD: Bìa mềm"
                    />
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="language" class="form-label">Ngôn ngữ</label>
                    <input
                      v-model.trim="form.language"
                      type="text"
                      class="form-control"
                      id="language"
                      placeholder="VD: Tiếng Việt"
                    />
                  </div>
                  <div class="col-md-2 mb-3">
                    <label for="pageCount" class="form-label">Số trang</label>
                    <input
                      v-model.number="form.pageCount"
                      type="number"
                      class="form-control"
                      id="pageCount"
                      placeholder="0"
                    />
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="isbn10" class="form-label">ISBN-10</label>
                    <input
                      v-model.trim="form.isbn10"
                      type="text"
                      class="form-control"
                      id="isbn10"
                      placeholder="Nhập mã ISBN"
                    />
                  </div>
                </div>

                <div class="mb-3 position-relative">
                  <label for="productCategory" class="form-label">Danh mục</label>
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
                  <label for="productImage" class="form-label">Hình ảnh sản phẩm {{ isEdit ? '(Để trống nếu không đổi)' : '' }}</label>
                  <input
                    type="file"
                    class="form-control"
                    id="productImage"
                    accept="image/*"
                    @change="handleFileChange"
                  />
                  <div v-if="imagePreview || form.imageUrl" class="mt-2">
                    <img
                      :src="imagePreview || form.imageUrl"
                      alt="Preview"
                      class="img-thumbnail"
                      style="max-height: 200px"
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label for="productDescription" class="form-label">Mô tả ngắn</label>
                  <textarea
                    v-model="form.description"
                    class="form-control"
                    id="productDescription"
                    rows="3"
                    placeholder="Nhập mô tả ngắn gọn"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="longDescription" class="form-label">Mô tả chi tiết</label>
                  <textarea
                    v-model="form.longDescription"
                    class="form-control"
                    id="longDescription"
                    rows="6"
                    placeholder="Nhập mô tả chi tiết sản phẩm"
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
                    {{ loading ? 'Đang lưu...' : (isEdit ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm') }}
                  </button>
                  <RouterLink :to="{ name: 'admin-products' }" class="btn btn-secondary">
                    Hủy
                  </RouterLink>
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
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createBook, updateBook, getBookById, uploadImage } from '@/services/booksService'
import { toast } from 'vue3-toastify'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const fetching = ref(false)
const selectedFile = ref(null)
const imagePreview = ref(null)

const isEdit = computed(() => !!route.params.id)

const form = reactive({
  title: '',
  sku: '',
  price: null,
  compareAtPrice: null,
  stock: null,
  categoryId: null,
  description: '',
  longDescription: '',
  format: '',
  language: '',
  pageCount: null,
  isbn10: '',
  dimensions: '',
  imageUrl: '',
})

const fetchProduct = async () => {
  if (!isEdit.value) return
  fetching.value = true
  try {
    const book = await getBookById(route.params.id)
    form.title = book.title
    form.sku = book.sku
    form.price = book.price
    form.compareAtPrice = book.compareAtPrice
    form.stock = book.stock
    form.description = book.description || ''
    form.longDescription = book.longDescription || ''
    form.format = book.format || ''
    form.language = book.language || ''
    form.pageCount = book.pageCount
    form.isbn10 = book.isbn10 || ''
    form.dimensions = book.dimensions || ''
    form.imageUrl = book.imageUrl || ''
    if (book.categories && book.categories.length > 0) {
      form.categoryId = book.categories[0].id
    }
  } catch (error) {
    toast.error('Lỗi khi tải thông tin sản phẩm')
    router.push({ name: 'admin-products' })
  } finally {
    fetching.value = false
  }
}

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

const handleSubmit = async () => {
  if (!form.title || !form.sku || form.price === null || form.stock === null) {
    toast.warning('Vui lòng điền đầy đủ các trường bắt buộc')
    return
  }

  loading.value = true
  try {
    let imageUrl = form.imageUrl

    if (selectedFile.value) {
      toast.info('Đang tải ảnh lên...', { autoClose: 1500 })
      try {
        const uploadRes = await uploadImage(selectedFile.value)
        imageUrl = uploadRes?.url || ''
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError)
        toast.warning('Upload ảnh thất bại, sử dụng ảnh cũ.')
      }
    }

    const payload = {
      title: form.title,
      sku: form.sku,
      price: Number(form.price),
      compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
      stock: Number(form.stock),
      description: form.description,
      longDescription: form.longDescription,
      format: form.format,
      language: form.language,
      pageCount: form.pageCount ? Number(form.pageCount) : null,
      isbn10: form.isbn10,
      dimensions: form.dimensions,
      imageUrl: imageUrl,
    }

    if (form.categoryId) {
      payload.categoryIds = [Number(form.categoryId)]
    }

    if (isEdit.value) {
      await updateBook(route.params.id, payload)
      toast.success('Cập nhật sản phẩm thành công!')
    } else {
      await createBook(payload)
      toast.success('Thêm sản phẩm thành công!')
    }
    router.push({ name: 'admin-products' })
  } catch (error) {
    console.error('Error saving product:', error)
    toast.error(error.message || 'Lỗi khi lưu sản phẩm')
  } finally {
    loading.value = false
  }
}

onMounted(fetchProduct)
</script>
