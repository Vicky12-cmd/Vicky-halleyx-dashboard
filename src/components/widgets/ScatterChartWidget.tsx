import React from 'react'
import {
  ScatterChart, Scatter, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { Widget, CustomerOrder } from '../../types'

interface Props {
  widget: Widget
  orders: CustomerOrder[]
}

function ScatterChartWidget({ widget, orders }: Props) {
  const { config } = widget

  const prepareData = () => {
    if (!config.xAxis || !config.yAxis || orders.length === 0) return []

    return orders.map((order: any) => ({
      x: Number(order[config.xAxis as string]) || 0,
      y: Number(order[config.yAxis as string]) || 0,
      name: `${order.firstName} ${order.lastName}`
    }))
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
          <ScatterChart margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="x"
              name={config.xAxis}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              dataKey="y"
              name={config.yAxis}
              tick={{ fontSize: 10 }}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter
              data={data}
              fill={config.chartColor || '#3b82f6'}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ScatterChartWidget