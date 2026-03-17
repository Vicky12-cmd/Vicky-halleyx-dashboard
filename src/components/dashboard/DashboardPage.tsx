import React, { useEffect } from 'react'
import { useDashboardStore } from '../../store/dashboardStore'
import { useOrderStore } from '../../store/orderStore'
import { DateFilter } from '../../types'
import DashboardCanvas from './DashboardCanvas'
import WidgetSidebar from './WidgetSidebar'
import ConfigPanel from './ConfigPanel'
import toast from 'react-hot-toast'

function DashboardPage() {
  const {
    isConfigMode,
    setConfigMode,
    saveDashboard,
    fetchDashboard,
    widgets,
    isConfigPanelOpen
  } = useDashboardStore()

  const { fetchOrders, setDateFilter, dateFilter } = useOrderStore()

  useEffect(() => {
    fetchDashboard()
    fetchOrders()
  }, [])

  const handleDateFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateFilter(e.target.value as DateFilter)
    fetchOrders()
  }

  const handleSave = async () => {
    await saveDashboard()
    setConfigMode(false)
    toast.success('Dashboard saved!')
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            {widgets.length} widgets configured
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 font-medium whitespace-nowrap">
              Show data for
            </label>
            <select
              value={dateFilter}
              onChange={handleDateFilter}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All time</option>
              <option value="today">Today</option>
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
            </select>
          </div>

          {/* Config Buttons */}
          {isConfigMode ? (
            <div className="flex gap-2">
              <button
                onClick={() => setConfigMode(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save Configuration
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfigMode(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap"
            >
              Configure Dashboard
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-4">
        {isConfigMode && (
          <div className="w-64 flex-shrink-0">
            <WidgetSidebar />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <DashboardCanvas />
        </div>
      </div>

      {/* Config Panel */}
      {isConfigPanelOpen && <ConfigPanel />}
    </div>
  )
}

export default DashboardPage