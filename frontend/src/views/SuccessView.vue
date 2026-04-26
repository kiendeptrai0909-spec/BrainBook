<template>
  <div class="success-page mt-5 py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8 text-center">
          <div class="card border-0 shadow-sm rounded-4 p-5" style="background-color: #fcfcfc;">

            <div class="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#28a745" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
            </div>

            <h3 class="fw-bold text-success mb-4">Order Placed Successfully!</h3>

            <p class="fs-5 text-dark mb-2">Hello: <strong>Customer Name</strong></p>
            <p class="fs-5 text-dark mb-4">Order ID: <strong style="color: #f07c82;">#1119681</strong></p>
            <p class="text-primary mb-4">Thank you for shopping at BrainBook. Your order has been received and is being processed.</p>

            <hr class="mb-4 mx-auto" style="border-color: #ddd; width: 80%;">

            <div class="text-dark mb-5">
              <p class="mb-2">Support Phone: <strong>(+84) 123 456 789</strong></p>
              <p class="mb-0">Support Email: <strong>hello@brainbook.com</strong></p>
            </div>

            <div>
              <RouterLink to="/" class="btn rounded-pill px-5 py-3 text-white fw-bold btn-home" style="background-color: #f07c82; font-size: 1.1rem;">
                Return to Homepage ({{ countdown }}s)
              </RouterLink>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

// Lấy công cụ điều hướng của Vue Router
const router = useRouter();

// Tạo biến đếm ngược thời gian (Ví dụ: 15 giây)
const countdown = ref(15);
let timer = null;

// Hàm chạy ngay khi trang vừa tải xong
onMounted(() => {
  // Thiết lập bộ đếm lặp lại mỗi 1 giây (1000ms)
  timer = setInterval(() => {
    countdown.value--; // Giảm 1 giây
    
    // Nếu hết giờ thì dừng bộ đếm và tự động chuyển về trang chủ '/'
    if (countdown.value <= 0) {
      clearInterval(timer);
      router.push('/');
    }
  }, 1000);
});

// Hàm dọn dẹp: Đảm bảo dừng bộ đếm nếu người dùng tự bấm nút về trang chủ trước khi hết giờ
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
/* Hiệu ứng hover cho nút quay về trang chủ */
.btn-home {
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(240, 124, 130, 0.3);
}

.btn-home:hover {
  background-color: #222222 !important; /* Chuyển màu đen giống các nút khác */
  box-shadow: 0 6px 12px rgba(34, 34, 34, 0.3);
  color: white !important;
}
</style>