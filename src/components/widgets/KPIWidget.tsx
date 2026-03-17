import React from 'react'
import { Widget, CustomerOrder } from '../../types'

interface Props {
  widget: Widget
  orders: CustomerOrder[]
}

function KPIWidget({ widget, orders }: Props) {
  const { config } = widget

  const calculateValue = () => {
    if (!config.metric || orders.length === 0) return 0
    const values = orders.map((o: any) => o[config.metric as string]).filter((v: any) => v !== undefined)
    if (config.aggregation === 'Count') return values.length
    if (config.aggregation === 'Sum') return values.reduce((a: number, b: any) => a + Number(b), 0)
    if (config.aggregation === 'Average') {
      const sum = values.reduce((a: number, b: any) => a + Number(b), 0)
      return values.length > 0 ? sum / values.length : 0
    }
    return values.length
  }

  const value = calculateValue()
  const precision = config.decimalPrecision ?? 0
  const formatted = config.dataFormat === 'Currency'
    ? `$${value.toFixed(precision)}`
    : value.toFixed(precision)

  const trend = value > 0 ? '↑' : '↓'
  const trendColor = value > 0 ? 'text-green-500' : 'text-red-500'

  const getBgColor = () => {
    if (config.metric === 'totalAmount') return 'from-blue-500 to-blue-600'
    if (config.metric === 'quantity') return 'from-green-500 to-green-600'
    if (config.metric === 'unitPrice') return 'from-purple-500 to-purple-600'
    return 'from-orange-500 to-orange-600'
  }

  return (
    <div className="h-full flex flex-col">
      {/* Colored Header */}
      <div className={`bg-gradient-to-r ${getBgColor()} p-3 rounded-t-xl`}>
        <p className="text-xs font-semibold text-white uppercase tracking-wider opacity-90">
          {config.title}
        </p>
        {config.description && (
          <p className="text-xs text-white opacity-70 mt-0.5">{config.description}</p>
        )}
      </div>

      {/* Value */}
      <div className="flex-1 flex items-center justify-between p-4 bg-white rounded-b-xl">
        <div>
          <p className="text-3xl font-bold text-gray-800">{formatted}</p>
          <p className="text-xs text-gray-400 mt-1">
            {config.aggregation} of {config.metric}
          </p>
        </div>
        <div className={`text-3xl font-bold ${trendColor}`}>
          {trend}
        </div>
      </div>
    </div>
  )
}

export default KPIWidget