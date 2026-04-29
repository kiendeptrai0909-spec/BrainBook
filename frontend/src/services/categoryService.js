import { apiClient } from './api'

export function getCategories() {
  return apiClient.get('/categories')
}

export function createCategory(data) {
  return apiClient.post('/categories', data)
}
