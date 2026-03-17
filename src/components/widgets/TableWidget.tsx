import React, { useState } from 'react'
import { Widget, CustomerOrder } from '../../types'

interface Props {
  widget: Widget
  orders: CustomerOrder[]
}

const ALL_COLUMNS = [
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

function TableWidget({ widget, orders }: Props) {
  const { config } = widget
  const [page, setPage] = useState(0)

  const selectedColumns = config.columns?.length
    ? ALL_COLUMNS.filter(c => config.columns!.includes(c.key))
    : ALL_COLUMNS.slice(0, 5)

  const pageSize = config.pagination || 5

  // Sort
  let sortedOrders = [...orders]
  if (config.sortBy === 'Ascending') {
    sortedOrders.sort((a, b) => a.totalAmount - b.totalAmount)
  } else if (config.sortBy === 'Descending') {
    sortedOrders.sort((a, b) => b.totalAmount - a.totalAmount)
  }

  const totalPages = Math.ceil(sortedOrders.length / pageSize)
  const paginated = sortedOrders.slice(page * pageSize, (page + 1) * pageSize)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700'
      case 'In Progress': return 'bg-blue-100 text-blue-700'
      default: return 'bg-yellow-100 text-yellow-700'
    }
  }

  if (orders.length === 0) {
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
      {/* Header */}
      <div className="p-3 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-700">{config.title}</p>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead>
            <tr
              style={{
                backgroundColor: config.headerBackground || '#54bd95',
                fontSize: config.fontSize || 14
              }}
            >
              {selectedColumns.map(col => (
                <th
                  key={col.key}
                  className="text-left px-3 py-2 text-white font-semibold"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((order, index) => (
              <tr
                key={order._id}
                className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                style={{ fontSize: config.fontSize || 14 }}
              >
                {selectedColumns.map(col => (
                  <td key={col.key} className="px-3 py-2 text-gray-600">
                    {col.key === 'status' ? (
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor((order as any)[col.key])}`}>
                        {(order as any)[col.key]}
                      </span>
                    ) : col.key === 'unitPrice' || col.key === 'totalAmount' ? (
                      `$${(order as any)[col.key]}`
                    ) : (
                      (order as any)[col.key] || '-'
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Page {page + 1} of {totalPages}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-2 py-1 text-xs bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200"
            >
              ←
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="px-2 py-1 text-xs bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TableWidget