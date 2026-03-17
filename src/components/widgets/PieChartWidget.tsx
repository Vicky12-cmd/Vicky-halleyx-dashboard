import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Widget, CustomerOrder } from '../../types'

interface Props {
  widget: Widget
  orders: CustomerOrder[]
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

function PieChartWidget({ widget, orders }: Props) {
  const { config } = widget

  const prepareData = () => {
    if (!config.chartData || orders.length === 0) return []
    const grouped: Record<string, number> = {}
    orders.forEach((order: any) => {
      const key = order[config.chartData as string] || 'Unknown'
      grouped[key] = (grouped[key] || 0) + 1
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

  const renderLabel = (props: any) => {
    const { name, percent } = props
    return `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-700">{config.title}</p>
      </div>
      <div className="flex-1 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius="70%"
              dataKey="value"
              label={renderLabel}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            {config.showLegend && <Legend />}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PieChartWidget