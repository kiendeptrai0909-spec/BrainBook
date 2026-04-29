import { apiClient } from './api'

export function getOrders() {
  return apiClient.get('/orders')
}

export function createOrder(data) {
  return apiClient.post('/orders', data)
}
