import React, { useState } from 'react'
import { CustomerOrder } from '../../types'

interface Props {
  orders: CustomerOrder[]
  onEdit: (order: CustomerOrder) => void
  onDelete: (id: string) => void
}

function OrderTable({ orders, onEdit, onDelete }: Props) {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; order: CustomerOrder } | null>(null)

  const handleRightClick = (e: React.MouseEvent, order: CustomerOrder) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY, order })
  }

  const closeMenu = () => setContextMenu(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700'
      case 'In Progress': return 'bg-blue-100 text-blue-700'
      default: return 'bg-yellow-100 text-yellow-700'
    }
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="text-6xl mb-4">📋</div>
        <p className="text-lg font-medium">No orders yet</p>
        <p className="text-sm">Click "Create Order" to add your first order</p>
      </div>
    )
  }

  return (
    <div onClick={closeMenu}>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Customer</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Product</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Quantity</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Unit Price</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Total</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Created By</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order._id}
                onContextMenu={(e) => handleRightClick(e, order)}
                className={`border-b border-gray-100 hover:bg-gray-50 cursor-context-menu transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-800">
                    {order.firstName} {order.lastName}
                  </div>
                  <div className="text-xs text-gray-400">{order.email}</div>
                </td>
                <td className="px-4 py-3 text-gray-600">{order.product}</td>
                <td className="px-4 py-3 text-gray-600">{order.quantity}</td>
                <td className="px-4 py-3 text-gray-600">${order.unitPrice}</td>
                <td className="px-4 py-3 font-medium text-gray-800">${order.totalAmount}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{order.createdBy}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(order)}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this order?')) {
                          onDelete(order._id!)
                        }
                      }}
                      className="text-red-500 hover:text-red-700 text-xs font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            onClick={() => { onEdit(contextMenu.order); closeMenu() }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm('Delete this order?')) {
                onDelete(contextMenu.order._id!)
              }
              closeMenu()
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default OrderTable