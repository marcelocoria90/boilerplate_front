import { create } from 'zustand'
import { api } from '../api/api'
import { use } from 'react'

// const apiSchema = {
//   login: {
//     request: {
//       username: 'string',
//       password: 'string',
//     },
//     response: {
//       user: {
//         id: 1,
//         email: 'test@example.com',
//         emailVerified: true,
//         name: 'Test User',
//         createdAt: '2023-01-01T00:00:00.000Z',
//         lastLogin: '2023-01-01T00:00:00.000Z',
//       },
//       token: 'jwt_token_string',
//     },
//   },
// }

export const useAuthStore = create((set) => ({
  user: null, //apiSchema.login.response.user,
  isAuthenticated: true,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post(`/auth/signup`, {
        email,
        password,
        name,
      })
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (e) {
      set({
        error: e.response.data.message || 'Error al crear usuario',
        isLoading: false,
      })
      throw e
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post(`/auth/login`, {
        username,
        password,
      })

      console.log('🧪response', response)

      set({
        isAuthenticated: true,
        user: response,
        error: null,
        isLoading: false,
      })
    } catch (e) {
      set({
        error: e.response?.data?.message || 'Error al iniciar sesión',
        isLoading: false,
      })
      throw e
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null })
    try {
      await api.get(`/auth/logout`)
      set({
        user: {
          username: 'coria.marcelo.90@gmail.com',
          password: 'abc123456',
        },
        isAuthenticated: false,
        isLoading: false,
      })
    } catch (e) {
      set({
        error: e.response?.data?.message || 'Error al cerrar sesión',
        isLoading: false,
      })
      throw e
    }
  },

  vrifyEmail: async (code) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post(`/verify-email`, { code })
      console.log('🧪response', response)
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      })
      return response.data
    } catch (e) {
      set({
        error: e.response?.data?.message || 'Error al verificar email',
        isLoading: false,
      })
      throw e
    }
  },

  checkout: async (credentials) => {
    set({ isCheckingAuth: true, error: null })
    try {
      const response = await api.get(`/check-auth`, { credentials })
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      })
    } catch (e) {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      })
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post(`/forgot-password`, { email })
      set({
        message: response.data.message,
        isLoading: false,
      })
      return response.data
    } catch (e) {
      set({
        error: e.response?.data?.message || 'Error en olvido de contraseña',
        isLoading: false,
      })
      throw e
    }
  },

  resetPassword: async (token, newPassword) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post(`/reset-password`, {
        code,
        newPassword,
      })
      set({
        message: response.data.message,
        isLoading: false,
      })
      return response.data
    } catch (e) {
      set({
        error: e.response?.data?.message || 'Error al resetear contraseña',
        isLoading: false,
      })
      throw e
    }
  },
}))
