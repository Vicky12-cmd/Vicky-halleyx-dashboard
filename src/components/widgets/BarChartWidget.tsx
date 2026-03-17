import React, { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, LabelList, ResponsiveContainer
} from 'recharts'
import { Widget, CustomerOrder } from '../../types'

interface Props {
  widget: Widget
  orders: CustomerOrder[]
}

function BarChartWidget({ widget, orders }: Props) {
  const { config } = widget

  const data = useMemo(() => {
    if (!config.xAxis || !config.yAxis) return []
    if (orders.length === 0) return []

    const grouped: Record<string, number> = {}
    orders.forEach((order: any) => {
      const key = String(order[config.xAxis as string] || 'Unknown')
      const val = Number(order[config.yAxis as string]) || 1
      grouped[key] = (grouped[key] || 0) + val
    })

    return Object.entries(grouped).map(([name, value]) => ({ name, value }))
  }, [config.xAxis, config.yAxis, orders])

  if (!config.xAxis || !config.yAxis) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-700">{config.title}</p>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
          ⚙️ Select X & Y Axis in settings
        </div>
      </div>
    )
  }

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
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="value" fill={config.chartColor || '#3b82f6'} radius={[4, 4, 0, 0]}>
              {config.showDataLabel && (
                <LabelList dataKey="value" position="top" style={{ fontSize: 10 }} />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BarChartWidget