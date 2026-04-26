import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ShopView from '../views/ShopView.vue'
import BlogView from '../views/BlogView.vue'
import ContactView from '../views/ContactView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import SuccessView from '@/views/SuccessView.vue'
import CartView from '@/views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },

    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },

    {
      path: '/shop',
      name: 'shop',
      component: ShopView,
    },

    {
      path: '/blogs',
      name: 'blogs',
      component: BlogView,
    },

    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },

    {
      path: '/product/:slug',
      name: 'product-detail',
      component: ProductDetailView,
    },

    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
    },

    {
      path: '/success',
      name: 'success',
      component: SuccessView,
    },

    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },

  ],
})

export default router
