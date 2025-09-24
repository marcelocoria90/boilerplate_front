import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3020/api/v1'

console.log('🧪api_url', API_URL)

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Si vas a usar CSRF, acordalo con el back y descomentá:
// api.defaults.xsrfCookieName = 'XSRF-TOKEN'
// api.defaults.xsrfHeaderName = 'X-CSRF-Token'
