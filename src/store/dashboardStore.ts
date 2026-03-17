import { create } from 'zustand'
import axios from 'axios'
import { Widget, DashboardLayout } from '../types'

const API = 'http://localhost:5000/dashboard'

interface DashboardStore {
  widgets: Widget[]
  layout: DashboardLayout[]
  isConfigMode: boolean
  selectedWidget: Widget | null
  isConfigPanelOpen: boolean
  setConfigMode: (mode: boolean) => void
  setSelectedWidget: (widget: Widget | null) => void
  setConfigPanelOpen: (open: boolean) => void
  addWidget: (widget: Widget) => void
  removeWidget: (id: string) => void
  updateWidget: (id: string, config: any) => void
  updateLayout: (layout: DashboardLayout[]) => void
  saveDashboard: () => Promise<void>
  fetchDashboard: () => Promise<void>
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  widgets: [],
  layout: [],
  isConfigMode: false,
  selectedWidget: null,
  isConfigPanelOpen: false,

  setConfigMode: (mode) => set({ isConfigMode: mode }),
  
  setSelectedWidget: (widget) => set({ 
    selectedWidget: widget,
    isConfigPanelOpen: widget !== null 
  }),

  setConfigPanelOpen: (open) => set({ isConfigPanelOpen: open }),

 addWidget: (widget) => {
  const { widgets, layout } = get()
  const newLayout: DashboardLayout = {
    i: widget.id,
    x: 0,
    y: Infinity,
    w: widget.config.width || 6,
    h: widget.config.height || 4,
    minW: 2,
    minH: 2
  }
  set({
    widgets: [...widgets, widget],
    layout: [...layout, newLayout]
  })
},
  

  removeWidget: (id) => {
    set((state) => ({
      widgets: state.widgets.filter(w => w.id !== id),
      layout: state.layout.filter(l => l.i !== id)
    }))
  },

 updateWidget: (id, config) => {
  set((state) => {
    const updatedWidgets = state.widgets.map(w =>
      w.id === id ? { ...w, config: { ...w.config, ...config } } : w
    )
    
    // Layout also update பண்ணு
    const updatedLayout = state.layout.map(l => {
      if (l.i === id) {
        const widget = updatedWidgets.find(w => w.id === id)
        return {
          ...l,
          w: widget?.config.width || l.w,
          h: widget?.config.height || l.h
        }
      }
      return l
    })
    
    return {
      widgets: updatedWidgets,
      layout: updatedLayout
    }
  })
},

  updateLayout: (layout) => set({ layout }),

  saveDashboard: async () => {
    try {
      const { widgets, layout } = get()
      await axios.post(`${API}/save`, { widgets, layout })
    } catch (err) {
      console.error(err)
    }
  },

  fetchDashboard: async () => {
    try {
      const res = await axios.get(API)
      set({
        widgets: res.data.widgets || [],
        layout: res.data.layout || []
      })
    } catch (err) {
      console.error(err)
    }
  }
}))