import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'https://api.dev.midominio.com', // ajustá
  withCredentials: true,
  timeout: 15000,
})

http.interceptors.request.use((config) => {
  // si usás auth por cookie, listo. Si usás Bearer, agregalo acá:
  // const token = localStorage.getItem('access_token')
  // if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
