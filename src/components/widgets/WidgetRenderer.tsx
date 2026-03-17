import React from 'react'
import { Widget, CustomerOrder } from '../../types'
import BarChartWidget from './BarChartWidget'
import LineChartWidget from './LineChartWidget'
import PieChartWidget from './PieChartWidget'
import AreaChartWidget from './AreaChartWidget'
import ScatterChartWidget from './ScatterChartWidget'
import KPIWidget from './KPIWidget'
import TableWidget from './TableWidget'

interface Props {
  widget: Widget
  orders: CustomerOrder[]
}

function WidgetRenderer({ widget, orders }: Props) {
  const { type } = widget

  if (type === 'bar') return <BarChartWidget widget={widget} orders={orders} />
  if (type === 'line') return <LineChartWidget widget={widget} orders={orders} />
  if (type === 'pie') return <PieChartWidget widget={widget} orders={orders} />
  if (type === 'area') return <AreaChartWidget widget={widget} orders={orders} />
  if (type === 'scatter') return <ScatterChartWidget widget={widget} orders={orders} />
  if (type === 'kpi') return <KPIWidget widget={widget} orders={orders} />
  if (type === 'table') return <TableWidget widget={widget} orders={orders} />

  return <div className="p-4 text-gray-400">Unknown widget type</div>
}

export default WidgetRenderer