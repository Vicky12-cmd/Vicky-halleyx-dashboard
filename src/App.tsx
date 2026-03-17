import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import OrdersPage from './components/orders/OrdersPage'
import DashboardPage from './components/dashboard/DashboardPage'

type Page = 'dashboard' | 'orders'

function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard')

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-md">
        <div className="w-full px-4">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-blue-600 font-bold text-xs">H</span>
              </div>
              <span className="font-bold text-white text-base">
                Halleyx Dashboard
              </span>
            </div>

            {/* Nav Links */}
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={() => setActivePage('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  activePage === 'dashboard'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-white hover:bg-blue-500'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActivePage('orders')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  activePage === 'orders'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-white hover:bg-blue-500'
                }`}
              >
                Orders
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="w-full px-4 py-6">
        {activePage === 'dashboard' ? <DashboardPage /> : <OrdersPage />}
      </main>

      {/* Toast */}
      <Toaster position="top-right" />
    </div>
  )
}

export default App