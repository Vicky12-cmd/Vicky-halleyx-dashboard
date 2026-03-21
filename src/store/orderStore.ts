import { create } from 'zustand'
import axios from 'axios'
import { CustomerOrder, DateFilter } from '../types'

const API = process.env.REACT_APP_API_URL 
  ? `${process.env.REACT_APP_API_URL}/orders`
  : 'http://localhost:5000/orders'

interface OrderStore {
  orders: CustomerOrder[]
  loading: boolean
  dateFilter: DateFilter
  setDateFilter: (filter: DateFilter) => void
  fetchOrders: () => Promise<void>
  addOrder: (order: CustomerOrder) => Promise<void>
  updateOrder: (id: string, order: CustomerOrder) => Promise<void>
  deleteOrder: (id: string) => Promise<void>
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  loading: false,
  dateFilter: 'all',

  setDateFilter: (filter) => set({ dateFilter: filter }),

  fetchOrders: async () => {
    set({ loading: true })
    try {
      const { dateFilter } = get()
      let params = {}

      const now = new Date()
      if (dateFilter === 'today') {
        params = {
          startDate: new Date(now.setHours(0,0,0,0)).toISOString(),
          endDate: new Date().toISOString()
        }
      } else if (dateFilter === 'last7') {
        const d = new Date()
        d.setDate(d.getDate() - 7)
        params = { startDate: d.toISOString(), endDate: new Date().toISOString() }
      } else if (dateFilter === 'last30') {
        const d = new Date()
        d.setDate(d.getDate() - 30)
        params = { startDate: d.toISOString(), endDate: new Date().toISOString() }
      } else if (dateFilter === 'last90') {
        const d = new Date()
        d.setDate(d.getDate() - 90)
        params = { startDate: d.toISOString(), endDate: new Date().toISOString() }
      }

      const res = await axios.get(API, { params })
      set({ orders: res.data })
    } catch (err) {
      console.error(err)
    } finally {
      set({ loading: false })
    }
  },

  addOrder: async (order) => {
    try {
      const res = await axios.post(API, order)
      set((state) => ({ orders: [res.data, ...state.orders] }))
    } catch (err) {
      console.error(err)
    }
  },

  updateOrder: async (id, order) => {
    try {
      const res = await axios.put(`${API}/${id}`, order)
      set((state) => ({
        orders: state.orders.map(o => o._id === id ? res.data : o)
      }))
    } catch (err) {
      console.error(err)
    }
  },

  deleteOrder: async (id) => {
    try {
      await axios.delete(`${API}/${id}`)
      set((state) => ({
        orders: state.orders.filter(o => o._id !== id)
      }))
    } catch (err) {
      console.error(err)
    }
  }
}))
