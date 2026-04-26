<template>
  <div class="product-detail-page mt-5 py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 pe-lg-5 mb-5 mb-lg-0">
          <div class="widget search-widget mb-5">
            <form class="d-flex position-relative">
              <input
                type="text"
                class="form-control p-3 rounded-3 border-1"
                placeholder="Search keywords..."
              />
              <button
                type="submit"
                class="btn position-absolute end-0 top-50 translate-middle-y bg-transparent border-0"
              >
                <svg class="search" width="20" height="20">
                  <use xlink:href="#search"></use>
                </svg>
              </button>
            </form>
          </div>

          <div class="widget category-widget mb-5">
            <h5 class="fw-bold mb-4 text-dark">Book Categories</h5>
            <ul class="list-unstyled">
              <li class="mb-3 d-flex justify-content-between align-items-center">
                <a href="#" class="text-decoration-none text-primary hover-dark fw-medium"
                  >Romance</a
                >
                <span class="badge bg-light text-dark rounded-pill">(15)</span>
              </li>
              <li class="mb-3 d-flex justify-content-between align-items-center">
                <a href="#" class="text-decoration-none text-primary hover-dark fw-medium"
                  >Fiction</a
                >
                <span class="badge bg-light text-dark rounded-pill">(22)</span>
              </li>
              <li class="mb-3 d-flex justify-content-between align-items-center">
                <a href="#" class="text-decoration-none text-primary hover-dark fw-medium"
                  >Sci-Fi & Fantasy</a
                >
                <span class="badge bg-light text-dark rounded-pill">(8)</span>
              </li>
              <li class="mb-3 d-flex justify-content-between align-items-center">
                <a href="#" class="text-decoration-none text-primary hover-dark fw-medium"
                  >Business & Money</a
                >
                <span class="badge bg-light text-dark rounded-pill">(12)</span>
              </li>
              <li class="mb-3 d-flex justify-content-between align-items-center">
                <a href="#" class="text-decoration-none text-primary hover-dark fw-medium"
                  >Self-Help</a
                >
                <span class="badge bg-light text-dark rounded-pill">(18)</span>
              </li>
            </ul>
          </div>

          <div class="widget featured-widget mb-5">
            <h5 class="fw-bold mb-4 text-dark">Featured Books</h5>
            <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
              <img
                src="/images/product-item2.png"
                class="img-fluid rounded-2"
                alt="book"
                style="width: 60px"
              />
              <div class="ms-3">
                <h6 class="mb-1">
                  <a href="#" class="text-decoration-none text-dark fw-bold hover-primary"
                    >Heartland Stars</a
                  >
                </h6>
                <div class="rating text-warning mb-1" style="font-size: 0.8rem">
                  <svg class="star star-fill" width="12" height="12">
                    <use xlink:href="#star-fill"></use>
                  </svg>
                  <svg class="star star-fill" width="12" height="12">
                    <use xlink:href="#star-fill"></use>
                  </svg>
                  <svg class="star star-fill" width="12" height="12">
                    <use xlink:href="#star-fill"></use>
                  </svg>
                  <svg class="star star-fill" width="12" height="12">
                    <use xlink:href="#star-fill"></use>
                  </svg>
                  <svg class="star star-fill" width="12" height="12">
                    <use xlink:href="#star-fill"></use>
                  </svg>
                </div>
                <span class="text-primary fw-bold">$25.00</span>
              </div>
            </div>
            <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
              <img
                src="/images/product-item3.png"
                class="img-fluid rounded-2"
                alt="book"
                style="width: 60px"
              />
              <div class="ms-3">
                <h6 class="mb-1">
                  <a href="#" class="text-decoration-none text-dark fw-bold hover-primary"
                    >Heavenly Bodies</a
                  >
                </h6>
                <div class="rating text-warning mb-1" style="font-size: 0.8rem">
                  <svg class="star star-fill" width="12" height="12">
                    <use xlink:href="#star-fill"></use>
                  </svg>
                  <svg class="star star-fill" width="12" height="12">
                    <use xlink:href="#star-fill"></use>
                  </svg>
                  <svg class="star star-fill" width="12" height="12">
                    <use xlink:href="#star-fill"></use>
                  </svg>
                  <svg class="star star-fill" width="12" height="12">
                    <use xlink:href="#star-fill"></use>
                  </svg>
                  <svg class="star-empty" width="12" height="12">
                    <use xlink:href="#star-empty"></use>
                  </svg>
                </div>
                <span class="text-primary fw-bold">$18.50</span>
              </div>
            </div>
          </div>

          <div class="widget tags-widget">
            <h5 class="fw-bold mb-4 text-dark">Popular Tags</h5>
            <div class="d-flex flex-wrap gap-2">
              <a href="#" class="btn btn-outline-primary btn-sm rounded-pill hover-dark-btn"
                >Bestseller</a
              >
              <a href="#" class="btn btn-outline-primary btn-sm rounded-pill hover-dark-btn"
                >New Arrival</a
              >
              <a href="#" class="btn btn-outline-primary btn-sm rounded-pill hover-dark-btn"
                >Classic</a
              >
              <a href="#" class="btn btn-outline-primary btn-sm rounded-pill hover-dark-btn"
                >Award Winner</a
              >
            </div>
          </div>
        </div>

        <div class="col-lg-9">
          <div v-if="loading" class="text-center py-5">Loading...</div>
          <div v-else-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
          <div v-else-if="!book" class="text-center py-5">Book not found</div>
          <div v-else>
          <div class="row mb-5">
            <div class="col-md-5 mb-4 mb-md-0">
              <div
                class="card border-0 bg-light p-4 rounded-3 d-flex align-items-center justify-content-center"
                style="height: 450px"
              >
                <img
                  :src="book.imageUrl"
                  class="img-fluid shadow-lg rounded-3"
                  alt="book cover"
                  style="max-height: 380px; object-fit: contain"
                />
              </div>
              <div class="d-flex justify-content-center gap-3 mt-3">
                <div
                  v-for="(img, idx) in book.images"
                  :key="img.id"
                  class="border rounded-2 p-1"
                  :class="idx === 0 ? 'border-primary' : ''"
                >
                  <img
                    :src="img.url"
                    width="50"
                    height="70"
                    :style="{ objectFit: 'cover', opacity: idx === 0 ? 1 : 0.6 }"
                  />
                </div>
              </div>
            </div>

            <div class="col-md-7 ps-md-5">
              <p class="mb-1" style="color: #666; font-weight: 500">Author: {{ book.author }}</p>
              <h2 class="fw-bold display-6 mb-2 text-dark">{{ book.title }}</h2>

              <div class="d-flex align-items-center mb-3">
                <div class="rating text-warning me-2">
                  <svg class="star star-fill" width="16" height="16">
                    <use xlink:href="#star-fill"></use>
                  </svg>
                  <svg class="star star-fill" width="16" height="16">
                    <use xlink:href="#star-fill"></use>
                  </svg>
                  <svg class="star star-fill" width="16" height="16">
                    <use xlink:href="#star-fill"></use>
                  </svg>
                  <svg class="star star-fill" width="16" height="16">
                    <use xlink:href="#star-fill"></use>
                  </svg>
                  <svg class="star-half" width="16" height="16">
                    <use xlink:href="#star-half"></use>
                  </svg>
                </div>
                <span style="color: #777">({{ book.reviewCount }} Customer Reviews)</span>
              </div>

              <div class="fs-2 text-primary fw-bold mb-3">${{ book.price }}</div>

              <ul class="list-unstyled mb-4" style="color: #555">
                <li class="mb-1"><strong>SKU:</strong> {{ book.sku }}</li>
                <li class="mb-1">
                  <strong>Availability: </strong>
                  <span
                    class="fw-bold"
                    :class="book.stock > 0 ? 'text-success' : 'text-danger'"
                  >
                    {{ book.stock > 0 ? `In Stock (${book.stock} copies)` : 'Out of stock' }}
                  </span>
                </li>
                <li class="mb-1"><strong>Format:</strong> {{ book.format }}</li>
              </ul>

              <p class="mb-4" style="color: #444; line-height: 1.8">
                {{ book.description }}
              </p>

              <div class="d-flex align-items-center mb-4 gap-3">
                <div class="d-flex border rounded-3 overflow-hidden quantity-wrapper">
                  <button
                    class="btn rounded-0 p-0 d-flex justify-content-center align-items-center btn-qty"
                    @click="quantity > 1 ? quantity-- : null"
                    type="button"
                  >
                    -
                  </button>

                  <input
                    type="text"
                    class="form-control border-0 text-center rounded-0 fw-bold p-0 qty-input"
                    v-model="quantity"
                    readonly
                  />

                  <button
                    class="btn rounded-0 p-0 d-flex justify-content-center align-items-center btn-qty"
                    @click="quantity++"
                    type="button"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  @click="addToCart"
                  :disabled="book.stock <= 0"
                  class="btn btn-add-cart fw-bold rounded-3 flex-grow-1 d-flex align-items-center justify-content-center"
                  style="height: 50px; max-width: 250px; text-decoration: none"
                >
                  Thêm Giỏ Hàng
                </button>
              </div>

              <div class="d-flex align-items-center gap-2 mt-4 pt-3 border-top">
                <span class="fw-bold text-dark me-2">Share:</span>
                <a
                  href="#"
                  class="d-flex align-items-center justify-content-center rounded-circle text-white text-decoration-none"
                  style="width: 35px; height: 35px; background-color: #3b5998; font-weight: bold"
                  >f</a
                >
                <a
                  href="#"
                  class="d-flex align-items-center justify-content-center rounded-circle text-white text-decoration-none"
                  style="width: 35px; height: 35px; background-color: #1da1f2; font-weight: bold"
                  >T</a
                >
                <a
                  href="#"
                  class="d-flex align-items-center justify-content-center rounded-circle text-white text-decoration-none"
                  style="width: 35px; height: 35px; background-color: #bd081c; font-weight: bold"
                  >P</a
                >
              </div>
            </div>
          </div>

          <div class="product-tabs mt-5 pt-5 border-top">
            <ul class="nav nav-tabs border-bottom-0 mb-4" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active fs-5 text-primary fw-bold border-0 bg-transparent px-0 pb-2 me-4"
                  :class="{ 'text-dark border-bottom border-dark border-3': activeTab === 'desc' }"
                  @click="activeTab = 'desc'"
                  type="button"
                >
                  Description
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link fs-5 text-primary fw-bold border-0 bg-transparent px-0 pb-2"
                  :class="{
                    'text-dark border-bottom border-dark border-3': activeTab === 'reviews',
                  }"
                  @click="activeTab = 'reviews'"
                  type="button"
                >
                  Reviews (3)
                </button>
              </li>
            </ul>

            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" v-if="activeTab === 'desc'">
                <p class="mb-3" style="color: #555; line-height: 1.8">
                  "The Fine Print" is the first book in the Dreamland Billionaires series. It offers
                  a captivating blend of romance, corporate intrigue, and character development.
                  Lauren Asher masterfully builds a world where ambition clashes with passion.
                </p>
                <h6 class="fw-bold mt-4 mb-3 text-dark">Book Details:</h6>
                <ul style="color: #555; line-height: 1.8">
                  <li><strong>Publisher:</strong> Piatkus Books</li>
                  <li><strong>Language:</strong> English</li>
                  <li><strong>Paperback:</strong> 448 pages</li>
                  <li><strong>ISBN-10:</strong> 0349433441</li>
                  <li><strong>Dimensions:</strong> 12.6 x 3.2 x 19.6 cm</li>
                </ul>
              </div>

              <div class="tab-pane fade show active" v-if="activeTab === 'reviews'">
                <div class="d-flex mb-4 pb-4 border-bottom">
                  <div class="flex-shrink-0">
                    <div
                      class="bg-dark rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                      style="width: 50px; height: 50px"
                    >
                      JD
                    </div>
                  </div>
                  <div class="ms-3">
                    <h6 class="fw-bold mb-1 text-dark">
                      Jane Doe
                      <span class="text-primary fw-normal ms-2" style="font-size: 0.85rem"
                        >- April 15, 2026</span
                      >
                    </h6>
                    <div class="rating text-warning mb-2" style="font-size: 0.8rem">
                      <svg class="star star-fill" width="14" height="14">
                        <use xlink:href="#star-fill"></use>
                      </svg>
                      <svg class="star star-fill" width="14" height="14">
                        <use xlink:href="#star-fill"></use>
                      </svg>
                      <svg class="star star-fill" width="14" height="14">
                        <use xlink:href="#star-fill"></use>
                      </svg>
                      <svg class="star star-fill" width="14" height="14">
                        <use xlink:href="#star-fill"></use>
                      </svg>
                      <svg class="star star-fill" width="14" height="14">
                        <use xlink:href="#star-fill"></use>
                      </svg>
                    </div>
                    <p class="mb-0" style="color: #555">
                      Absolutely loved this book! The chemistry between Rowan and Zahra is off the
                      charts. Couldn't put it down.
                    </p>
                  </div>
                </div>

                <div class="review-form mt-5 bg-light p-4 rounded-3 border">
                  <h4 class="fw-bold mb-4 text-dark">Leave a Reply</h4>
                  <form>
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <input
                          type="text"
                          class="form-control p-3 border-1"
                          placeholder="Your Name *"
                          required
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <input
                          type="email"
                          class="form-control p-3 border-1"
                          placeholder="Your Email *"
                          required
                        />
                      </div>
                    </div>
                    <div class="mb-3">
                      <div class="d-flex align-items-center bg-white p-3 rounded-2 border border-1">
                        <span class="me-3 fw-medium text-dark">Your Rating:</span>
                        <div class="rating text-warning" style="cursor: pointer">
                          <svg class="star star-empty" width="20" height="20">
                            <use xlink:href="#star-empty"></use>
                          </svg>
                          <svg class="star star-empty" width="20" height="20">
                            <use xlink:href="#star-empty"></use>
                          </svg>
                          <svg class="star star-empty" width="20" height="20">
                            <use xlink:href="#star-empty"></use>
                          </svg>
                          <svg class="star star-empty" width="20" height="20">
                            <use xlink:href="#star-empty"></use>
                          </svg>
                          <svg class="star star-empty" width="20" height="20">
                            <use xlink:href="#star-empty"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="mb-4">
                      <textarea
                        class="form-control p-3 border-1"
                        rows="5"
                        placeholder="Your Review *"
                        required
                      ></textarea>
                    </div>
                    <button type="submit" class="btn btn-dark px-5 py-3 rounded-3 fw-bold">
                      Post Comment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiGet, apiPost } from '@/lib/api'

const quantity = ref(1)
const activeTab = ref('desc')
const router = useRouter()
const route = useRoute()

const book = ref(null)
const loading = ref(false)
const error = ref('')

async function fetchBookBySlug(slug) {
  loading.value = true
  error.value = ''
  book.value = null
  try {
    book.value = await apiGet(`/books/slug/${encodeURIComponent(slug)}`)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load book'
  } finally {
    loading.value = false
  }
}

const addToCart = async () => {
  if (!book.value) return

  await apiPost('/cart/items', {
    body: { bookId: book.value.id, quantity: quantity.value },
    includeSession: true,
  })
  router.push('/cart')
}

onMounted(async () => {
  const slug = route.params.slug
  if (typeof slug === 'string' && slug.trim()) {
    await fetchBookBySlug(slug)
  } else {
    error.value = 'Missing slug'
  }
})

watch(
  () => route.params.slug,
  async (newSlug) => {
    if (typeof newSlug === 'string' && newSlug.trim()) {
      await fetchBookBySlug(newSlug)
    }
  },
)
</script>

<style scoped>
/* Khung bọc ngoài bộ đếm */
.quantity-wrapper {
  height: 45px;
  border-color: #f07c82 !important;
}

/* Định dạng cho ô nhập số */
.qty-input {
  width: 45px;
  background-color: #ffffff !important;
  color: #000000 !important;
  box-shadow: none !important;
  cursor: default;
}

/* Định dạng cho nút Cộng / Trừ */
.btn-qty {
  width: 40px;
  background-color: #f07c82 !important; /* Màu hồng cam mặc định */
  color: #ffffff !important;
  font-size: 1.4rem;
  font-weight: bold;
  box-shadow: none !important;
  line-height: 1;
  transition: all 0.3s ease !important; /* Hiệu ứng chuyển màu mượt mà */
}

/* Hiệu ứng Hover: Chuyển sang màu đen */
.btn-qty:hover {
  background-color: #222222 !important;
  color: #ffffff !important;
}
</style>
