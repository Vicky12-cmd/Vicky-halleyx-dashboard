import React from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, LabelList, ResponsiveContainer
} from 'recharts'
import { Widget, CustomerOrder } from '../../types'

interface Props {
  widget: Widget
  orders: CustomerOrder[]
}

function AreaChartWidget({ widget, orders }: Props) {
  const { config } = widget

  const prepareData = () => {
    if (!config.xAxis || !config.yAxis || orders.length === 0) return []

    const grouped: Record<string, number> = {}
    orders.forEach((order: any) => {
      const key = order[config.xAxis as string] || 'Unknown'
      const val = Number(order[config.yAxis as string]) || 1
      grouped[key] = (grouped[key] || 0) + val
    })

    return Object.entries(grouped).map(([name, value]) => ({ name, value }))
  }

  const data = prepareData()

  if (data.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-700">{config.title}</p>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
          No data available
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-700">{config.title}</p>
      </div>
      <div className="flex-1 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={config.chartColor || '#3b82f6'}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={config.chartColor || '#3b82f6'}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke={config.chartColor || '#3b82f6'}
              strokeWidth={2}
              fill="url(#colorValue)"
            >
              {config.showDataLabel && (
                <LabelList dataKey="value" position="top" style={{ fontSize: 10 }} />
              )}
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AreaChartWidget