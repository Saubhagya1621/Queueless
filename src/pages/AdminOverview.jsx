import { useState } from 'react'
import Navbar from '../components/Navbar'

const initialCounters = [
  { id: 1, name: 'Counter 1', status: 'Active', waiting: 8 },
  { id: 2, name: 'Counter 2', status: 'Active', waiting: 5 },
  { id: 3, name: 'Counter 3', status: 'Idle', waiting: 0 },
]

function AdminOverview() {
  const [counters, setCounters] = useState(initialCounters)

  const toggleStatus = (id, newStatus) => {
    setCounters((prev) =>
      prev.map((counter) =>
        counter.id === id ? { ...counter, status: newStatus } : counter
      )
    )
  }

  const summary = [
    { label: 'Total Waiting', value: 24 },
    { label: 'Total Served Today', value: 87 },
    { label: 'Active Counters', value: 3 },
  ]

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 font-poppins transition-colors duration-300">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 pt-27 pb-8">
        <h1 className="text-2xl font-semibold text-[#111827] dark:text-white mb-6">
          Admin Overview
        </h1>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {summary.map((item) => (
            <div
              key={item.label}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5"
            >
              <p className="text-2xl font-semibold text-[#6366F1]">
                {item.value}
              </p>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Counters list */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-base font-medium text-[#111827] dark:text-white mb-4">
            Counters
          </h2>

          <ul className="divide-y divide-gray-100">
            {counters.map((counter) => (
              <li
                key={counter.id}
                className="flex items-center justify-between py-4"
              >
                <div>
                  <p className="text-sm font-medium text-[#111827]">
                    {counter.name}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        counter.status === 'Active'
                          ? 'bg-[#10B981]/10 text-[#10B981]'
                          : 'bg-[#F59E0B]/10 text-[#F59E0B]'
                      }`}
                    >
                      {counter.status}
                    </span>

                    <span className="text-xs text-[#6B7280]">
                      {counter.waiting} waiting
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleStatus(counter.id, 'Active')}
                    disabled={counter.status === 'Active'}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#6366F1] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#4F46E5] transition-colors"
                  >
                    Open
                  </button>

                  <button
                    onClick={() => toggleStatus(counter.id, 'Idle')}
                    disabled={counter.status === 'Idle'}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-[#111827] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}

export default AdminOverview