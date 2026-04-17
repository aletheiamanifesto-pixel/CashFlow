import axios from 'axios'
import { API_URL } from './constants'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor per aggiungere JWT token a ogni richiesta autenticata
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('cashflow_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Interceptor per gestire errori 401 (token scaduto)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cashflow_token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Auth
export const authApi = {
  register: (data: { email: string; password: string; walletAddress?: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
}

// Depositi
export const depositsApi = {
  create: (data: FormData) =>
    api.post('/deposits', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getAll: () => api.get('/deposits'),
  getById: (id: string) => api.get(`/deposits/${id}`),
  updateStatus: (id: string, status: string) =>
    api.patch(`/deposits/${id}/status`, { status }),
}

// KYC
export const kycApi = {
  submit: (data: FormData) =>
    api.post('/kyc/submit', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getStatus: () => api.get('/kyc/status'),
}

// Prezzi
export const priceApi = {
  gold: () => api.get('/price/gold'),
  silver: () => api.get('/price/silver'),
}

// Payout
export const payoutApi = {
  execute: (data: { depositId: string; currency: 'USDC' | 'USDT'; walletAddress: string }) =>
    api.post('/payouts/execute', data),
}

// Admin
export const adminApi = {
  getDeposits: () => api.get('/admin/deposits'),
  approve: (id: string) => api.post(`/admin/approve/${id}`),
  mint: (id: string) => api.post(`/admin/mint/${id}`),
}

export default api
