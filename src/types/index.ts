// Customer Order Type
export interface CustomerOrder {
  _id?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  streetAddress: string
  city: string
  state: string
  postalCode: string
  country: string
  product: string
  quantity: number
  unitPrice: number
  totalAmount: number
  status: 'Pending' | 'In Progress' | 'Completed'
  createdBy: string
  createdAt?: string
  updatedAt?: string
}

// Widget Types
export type WidgetType = 
  | 'bar' 
  | 'line' 
  | 'pie' 
  | 'area' 
  | 'scatter' 
  | 'table' 
  | 'kpi'

export interface WidgetConfig {
  // Common
  title: string
  description?: string
  width: number
  height: number
  // Chart specific
  xAxis?: string
  yAxis?: string
  chartColor?: string
  showDataLabel?: boolean
  // Pie specific
  chartData?: string
  showLegend?: boolean
  // KPI specific
  metric?: string
  aggregation?: 'Sum' | 'Average' | 'Count'
  dataFormat?: 'Number' | 'Currency'
  decimalPrecision?: number
  // Table specific
  columns?: string[]
  sortBy?: string
  pagination?: number
  applyFilter?: boolean
  fontSize?: number
  headerBackground?: string
}

export interface Widget {
  id: string
  type: WidgetType
  config: WidgetConfig
}

export interface DashboardLayout {
  i: string
  x: number
  y: number
  w: number
  h: number
  [key: string]: any
}

// Date Filter
export type DateFilter = 
  | 'all' 
  | 'today' 
  | 'last7' 
  | 'last30' 
  | 'last90'