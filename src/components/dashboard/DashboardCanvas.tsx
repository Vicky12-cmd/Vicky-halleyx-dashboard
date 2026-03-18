import React from 'react'
import { Responsive as ResponsiveGridLayout, useContainerWidth } from 'react-grid-layout'
import { useDashboardStore } from '../../store/dashboardStore'
import { useOrderStore } from '../../store/orderStore'
import WidgetRenderer from '../widgets/WidgetRenderer'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

function DashboardCanvas() {
  const {
    widgets,
    layout,
    isConfigMode,
    updateLayout,
    removeWidget,
    setSelectedWidget
  } = useDashboardStore()

  const { orders } = useOrderStore()

  const { width, containerRef, mounted } = useContainerWidth()

  if (widgets.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center py-32 bg-white rounded-xl border-2 border-dashed border-blue-200 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-4xl">📊</span>
      </div>
      <h3 className="text-xl font-bold text-gray-700">No widgets yet</h3>
      <p className="text-sm text-gray-400 mt-2 text-center max-w-xs">
        {isConfigMode
          ? '👈 Click widgets from the sidebar to add them to your dashboard'
          : 'Click "Configure Dashboard" to start building your dashboard'}
      </p>
      {!isConfigMode && (
        <div className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
          Get Started →
        </div>
      )}
    </div>
  )
}

  return (
    <div ref={containerRef} className="bg-white rounded-xl border border-gray-200 min-h-96 p-2">
      {mounted && (
        <ResponsiveGridLayout
  className="layout"
  width={width}
  layouts={{
    lg: layout,
    md: layout.map(l => ({ ...l, w: Math.min(l.w, 10) })),
    sm: layout.map(l => ({ ...l, w: Math.min(l.w, 6) })),
    xs: layout.map(l => ({ ...l, w: Math.min(l.w, 4) })),
    xxs: layout.map(l => ({ ...l, w: 2 }))
  }}
  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
  cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
  rowHeight={80}
  onLayoutChange={(layout: any, layouts: any) => updateLayout(layout)}
  margin={[12, 12]}
>
        
          {widgets.map(widget => (
          <div key={widget.id} className="relative group h-full">
            {isConfigMode && (
              <div className="absolute top-2 right-2 z-10 hidden group-hover:flex gap-1">
               <button
  onClick={(e) => {
    e.stopPropagation()
    setSelectedWidget(null)
    setTimeout(() => setSelectedWidget(widget), 50)
  }}
  className="w-7 h-7 bg-blue-600 text-white rounded-lg text-xs flex items-center justify-center hover:bg-blue-700 shadow"
  title="Settings"
>
  ⚙️
</button>
                <button
                  onClick={() => {
                    if (window.confirm('Remove this widget?')) {
                      removeWidget(widget.id)
                    }
                  }}
                  className="w-7 h-7 bg-red-500 text-white rounded-lg text-xs flex items-center justify-center hover:bg-red-600 shadow"
                >
                  🗑️
                </button>
              </div>
            )}
            <div className="h-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <WidgetRenderer widget={widget} orders={orders} />
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>
      )}
    </div>
  )
}

export default DashboardCanvas
