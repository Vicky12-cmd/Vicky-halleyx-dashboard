import React, { useState } from 'react'
import { useDashboardStore } from '../../store/dashboardStore'
import { Widget, WidgetType } from '../../types'
import { v4 as uuidv4 } from 'uuid'

const WIDGET_GROUPS = [
  {
    group: 'Charts',
    icon: '📊',
    items: [
      { type: 'bar' as WidgetType, label: 'Bar Chart', icon: '📊' },
      { type: 'line' as WidgetType, label: 'Line Chart', icon: '📈' },
      { type: 'pie' as WidgetType, label: 'Pie Chart', icon: '🥧' },
      { type: 'area' as WidgetType, label: 'Area Chart', icon: '📉' },
      { type: 'scatter' as WidgetType, label: 'Scatter Plot', icon: '✦' },
    ]
  },
  {
    group: 'Tables',
    icon: '📋',
    items: [
      { type: 'table' as WidgetType, label: 'Table', icon: '📋' },
    ]
  },
  {
    group: 'KPIs',
    icon: '🎯',
    items: [
      { type: 'kpi' as WidgetType, label: 'KPI Value', icon: '🎯' },
    ]
  }
]

const DEFAULT_SIZES: Record<WidgetType, { w: number; h: number }> = {
  bar: { w: 6, h: 4 },
  line: { w: 6, h: 4 },
  pie: { w: 4, h: 4 },
  area: { w: 6, h: 4 },
  scatter: { w: 6, h: 4 },
  table: { w: 8, h: 4 },
  kpi: { w: 3, h: 2 },
}

function WidgetSidebar() {
  const { addWidget } = useDashboardStore()
  const [expanded, setExpanded] = useState<string[]>(['Charts', 'Tables', 'KPIs'])

  const toggleGroup = (group: string) => {
    setExpanded(prev =>
      prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]
    )
  }

  const handleAddWidget = (type: WidgetType, label: string) => {
    const size = DEFAULT_SIZES[type]
    const newWidget: Widget = {
      id: uuidv4(),
      type,
      config: {
        title: label,
        description: '',
        width: size.w,
        height: size.h,
      }
    }
    addWidget(newWidget)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">Widgets</h3>
        <p className="text-xs text-gray-500 mt-1">Click to add to canvas</p>
      </div>

      <div className="p-2">
        {WIDGET_GROUPS.map(group => (
          <div key={group.group} className="mb-1">
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(group.group)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <span>{group.icon}</span>
                {group.group}
              </span>
              <span className="text-gray-400 text-xs">
                {expanded.includes(group.group) ? '▼' : '▶'}
              </span>
            </button>

            {/* Group Items */}
            {expanded.includes(group.group) && (
              <div className="ml-2 space-y-1">
                {group.items.map(item => (
                  <button
                    key={item.type}
                    onClick={() => handleAddWidget(item.type, item.label)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WidgetSidebar