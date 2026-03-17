import React, { useEffect, useState } from 'react'
import { useOrderStore } from '../../store/orderStore'
import { CustomerOrder } from '../../types'
import OrderForm from './OrderForm'
import OrderTable from './OrderTable'
import toast from 'react-hot-toast'

function OrdersPage() {
  const { orders, loading, fetchOrders, addOrder, updateOrder, deleteOrder } = useOrderStore()
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState<CustomerOrder | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleSubmit = async (data: CustomerOrder) => {
    if (editData?._id) {
      await updateOrder(editData._id, data)
      toast.success('Order updated successfully!')
    } else {
      await addOrder(data)
      toast.success('Order created successfully!')
    }
    setShowForm(false)
    setEditData(null)
  }

  const handleEdit = (order: CustomerOrder) => {
    setEditData(order)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    await deleteOrder(id)
    toast.success('Order deleted!')
  }

  const handleClose = () => {
    setShowForm(false)
    setEditData(null)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customer Orders</h1>
          <p className="text-sm text-gray-500 mt-1">
            {orders.length} total orders
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          + Create Order
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <OrderTable
          orders={orders}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Order Form Modal */}
      {showForm && (
        <OrderForm
          onSubmit={handleSubmit}
          onClose={handleClose}
          editData={editData}
        />
      )}
    </div>
  )
}

export default OrdersPage