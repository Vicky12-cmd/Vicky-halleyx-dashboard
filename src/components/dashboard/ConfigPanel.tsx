import React from 'react'
import { useDashboardStore } from '../../store/dashboardStore'

const METRICS = [
  { key: 'totalAmount', label: 'Total Amount' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'unitPrice', label: 'Unit Price' },
  { key: 'status', label: 'Status' },
  { key: 'product', label: 'Product' },
  { key: 'createdBy', label: 'Created By' },
  { key: 'country', label: 'Country' },
]

const NUMERIC_METRICS = ['totalAmount', 'quantity', 'unitPrice']

const AXIS_OPTIONS = [
  { key: 'product', label: 'Product' },
  { key: 'status', label: 'Status' },
  { key: 'createdBy', label: 'Created By' },
  { key: 'country', label: 'Country' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'unitPrice', label: 'Unit Price' },
  { key: 'totalAmount', label: 'Total Amount' },
]

const TABLE_COLUMNS = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'country', label: 'Country' },
  { key: 'product', label: 'Product' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'unitPrice', label: 'Unit Price' },
  { key: 'totalAmount', label: 'Total Amount' },
  { key: 'status', label: 'Status' },
  { key: 'createdBy', label: 'Created By' },
]

function ConfigPanel() {
  const { selectedWidget, updateWidget, setConfigPanelOpen, setSelectedWidget } = useDashboardStore()

  if (!selectedWidget) return null

  const { config, type } = selectedWidget

  const handleChange = (key: string, value: any) => {
    updateWidget(selectedWidget.id, { [key]: value })
  }

  const handleColumnToggle = (key: string) => {
  const currentWidget = useDashboardStore.getState().selectedWidget
  const cols = currentWidget?.config.columns || []
  const updated = cols.includes(key)
    ? cols.filter((c: string) => c !== key)
    : [...cols, key]
  handleChange('columns', updated)
}

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl border-l border-gray-200 z-50 overflow-y-auto">
      
      <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white">
        <div>
          <h3 className="font-bold text-gray-800">Widget Settings</h3>
          <p className="text-xs text-gray-500 capitalize">{type} widget</p>
        </div>
       <button
  onClick={() => {
    setConfigPanelOpen(false)
    setSelectedWidget(null)
  }}
  className="text-gray-400 hover:text-gray-600 text-xl"
>
  ×
</button>
      </div>

      <div className="p-4 space-y-5">
        {/* Common Settings */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">General</h4>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Widget Title</label>
            <input
              value={config.title || ''}
              onChange={e => handleChange('title', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Widget Type</label>
            <input
              value={type}
              readOnly
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 capitalize"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={config.description || ''}
              onChange={e => handleChange('description', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>
        </div>

        {/* Widget Size */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Widget Size</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Width (Columns)</label>
              <input
                type="number"
                min={1}
                max={12}
                value={config.width || 4}
                onChange={e => handleChange('width', Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Height (Rows)</label>
              <input
                type="number"
                min={1}
                value={config.height || 4}
                onChange={e => handleChange('height', Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

       
        {type === 'kpi' && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Data Settings</h4>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Select Metric</label>
              <select
                value={config.metric || ''}
                onChange={e => handleChange('metric', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select metric</option>
                {METRICS.map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Aggregation</label>
              <select
                value={config.aggregation || 'Count'}
                onChange={e => handleChange('aggregation', e.target.value)}
               disabled={false}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400"
              >
                <option value="Sum">Sum</option>
                <option value="Average">Average</option>
                <option value="Count">Count</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Data Format</label>
              <select
                value={config.dataFormat || 'Number'}
                onChange={e => handleChange('dataFormat', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Number">Number</option>
                <option value="Currency">Currency</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Decimal Precision</label>
              <input
                type="number"
                min={0}
                value={config.decimalPrecision ?? 0}
                onChange={e => handleChange('decimalPrecision', Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Chart Settings */}
        {['bar', 'line', 'area', 'scatter'].includes(type) && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Data Settings</h4>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">X Axis</label>
              <select
                value={config.xAxis || ''}
                onChange={e => handleChange('xAxis', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select X Axis</option>
                {AXIS_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Y Axis</label>
              <select
                value={config.yAxis || ''}
                onChange={e => handleChange('yAxis', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Y Axis</option>
                {AXIS_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Chart Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={config.chartColor || '#3b82f6'}
                  onChange={e => handleChange('chartColor', e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={config.chartColor || '#3b82f6'}
                  onChange={e => handleChange('chartColor', e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showDataLabel"
                checked={config.showDataLabel || false}
                onChange={e => handleChange('showDataLabel', e.target.checked)}
                className="rounded"
              />
              <label htmlFor="showDataLabel" className="text-sm text-gray-700">Show Data Label</label>
            </div>
          </div>
        )}

        {/* Pie Settings */}
        {type === 'pie' && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Data Settings</h4>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Chart Data</label>
              <select
                value={config.chartData || ''}
                onChange={e => handleChange('chartData', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select data</option>
                {AXIS_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showLegend"
                checked={config.showLegend || false}
                onChange={e => handleChange('showLegend', e.target.checked)}
                className="rounded"
              />
              <label htmlFor="showLegend" className="text-sm text-gray-700">Show Legend</label>
            </div>
          </div>
        )}

        {/* Table Settings */}
        {type === 'table' && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Data Settings</h4>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Choose Columns</label>
              <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2">
               {TABLE_COLUMNS.map(col => {
  const isChecked = (selectedWidget?.config.columns || []).includes(col.key)
  return (
    <label key={col.key} className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => handleColumnToggle(col.key)}
        className="rounded"
      />
      <span className="text-sm text-gray-700">{col.label}</span>
    </label>
  )
})}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={config.sortBy || ''}
                onChange={e => handleChange('sortBy', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">None</option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Pagination</label>
              <select
                value={config.pagination || 5}
                onChange={e => handleChange('pagination', Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Font Size</label>
              <input
                type="number"
                min={12}
                max={18}
                value={config.fontSize || 14}
                onChange={e => handleChange('fontSize', Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Header Background</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={config.headerBackground || '#54bd95'}
                  onChange={e => handleChange('headerBackground', e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={config.headerBackground || '#54bd95'}
                  onChange={e => handleChange('headerBackground', e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConfigPanel
