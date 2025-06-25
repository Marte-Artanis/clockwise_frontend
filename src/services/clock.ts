import { api } from '../lib/api'

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface DateFilter {
  start_date?: string
  end_date?: string
}

export interface ClockEntry {
  id: string
  clockIn: string
  clockOut: string | null
  description?: string | null
}

export interface StatusResponse {
  success: boolean
  data: {
    is_clocked_in: boolean
    today_hours: number
    current_entry: ClockEntry | null
  }
}

export const clockService = {
  getStatus: async () => {
    const { data } = await api.get<StatusResponse>('/clock/status')
    return data
  },
  clockIn: async (description?: string) => {
    const { data } = await api.post('/clock/in', { description })
    return data
  },
  clockOut: async () => {
    const { data } = await api.post('/clock/out')
    return data
  },
  getToday: async () => {
    const { data } = await api.get('/clock/today')
    return data
  },
  getWeek: async () => {
    const { data } = await api.get('/clock/week')
    return data
  },
  getMonth: async () => {
    const { data } = await api.get('/clock/month')
    return data
  },
  getHistory: async (pagination?: PaginationParams, filter?: DateFilter) => {
    const params: any = {}
    if (pagination?.page) params.page = pagination.page
    if (pagination?.limit) params.limit = pagination.limit
    if (filter?.start_date) params.start_date = filter.start_date
    if (filter?.end_date) params.end_date = filter.end_date
    const { data } = await api.get('/clock/history', { params })
    return data
  }
} 