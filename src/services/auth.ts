import { api } from '../lib/api'

export interface User {
  id: string
  name: string
  email: string
}

export interface AuthResponse {
  success: boolean
  token: string
  user: User
}

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password })
    return data
  },
  register: async (name: string, email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/register', { name, email, password })
    return data
  }
} 