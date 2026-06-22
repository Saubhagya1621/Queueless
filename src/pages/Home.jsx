import { useState } from 'react'
// import { useEffect } from 'react'          // BACKEND: uncomment when connecting API
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
// import { getServiceCenters } from '../utils/api'  // BACKEND: uncomment when connecting API

// -------------------------------------------------------------------------
// FAKE DATA — Remove this entire block when backend is ready
// Replace with API call inside useEffect below
// -------------------------------------------------------------------------
const hardcodedServiceCenters = [
  // Hospitals
  { id: 1, name: 'City Care Hospital', type: 'Multi-speciality Hospital', category: 'Hospital', waiting: 12, waitTime: '25 min', counters: 3 },
  { id: 2, name: 'District Hospital', type: 'Government Hospital', category: 'Hospital', waiting: 25, waitTime: '40 min', counters: 5 },
  { id: 3, name: 'Apollo Clinic', type: 'Private Clinic', category: 'Hospital', waiting: 8, waitTime: '15 min', counters: 2 },
  // Clinics
  { id: 4, name: 'HealthPlus Clinic', type: 'General Physician Clinic', category: 'Clinic', waiting: 6, waitTime: '12 min', counters: 2 },
  { id: 5, name: 'MedCare Centre', type: 'Diagnostic & Consultation', category: 'Clinic', waiting: 10, waitTime: '20 min', counters: 3 },
  { id: 6, name: 'WellLife Clinic', type: 'Family Health Clinic', category: 'Clinic', waiting: 4, waitTime: '8 min', counters: 1 },
  // Banks
  { id: 7, name: 'SBI Bank Branch', type: 'State Bank of India', category: 'Bank', waiting: 18, waitTime: '30 min', counters: 4 },
  { id: 8, name: 'HDFC Bank', type: 'Private Sector Bank', category: 'Bank', waiting: 10, waitTime: '18 min', counters: 3 },
  { id: 9, name: 'Bank of Baroda', type: 'Public Sector Bank', category: 'Bank', waiting: 14, waitTime: '22 min', counters: 3 },
  // Government
  { id: 10, name: 'Regional Passport Office', type: 'Government Office', category: 'Government', waiting: 35, waitTime: '55 min', counters: 6 },
  { id: 11, name: 'RTO Office', type: 'Regional Transport Office', category: 'Government', waiting: 20, waitTime: '35 min', counters: 3 },
  { id: 12, name: 'Ration Card Office', type: 'Civil Supplies Department', category: 'Government', waiting: 28, waitTime: '45 min', counters: 4 },
]
// -------------------------------------------------------------------------
// END FAKE DATA
// -------------------------------------------------------------------------

const categoryConfig = {
  Hospital: {
    bg: 'bg-blue-50 dark:bg-blue-950/60',
    border: 'border-blue-200 dark:border-blue-800',
    badge: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
    icon: '🏥',
    stat: 'text-blue-600 dark:text-blue-400',
    button: 'bg-blue-500 hover:bg-blue-600',
  },
  Clinic: {
    bg: 'bg-green-50 dark:bg-green-950/60',
    border: 'border-green-200 dark:border-green-800',
    badge: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300',
    icon: '🩺',
    stat: 'text-green-600 dark:text-green-400',
    button: 'bg-green-500 hover:bg-green-600',
  },
  Bank: {
    bg: 'bg-amber-50 dark:bg-amber-950/60',
    border: 'border-amber-200 dark:border-amber-800',
    badge: 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300',
    icon: '🏦',
    stat: 'text-amber-600 dark:text-amber-400',
    button: 'bg-amber-500 hover:bg-amber-600',
  },
  Government: {
    bg: 'bg-purple-50 dark:bg-purple-950/60',
    border: 'border-purple-200 dark:border-purple-800',
    badge: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300',
    icon: '🏛️',
    stat: 'text-purple-600 dark:text-purple-400',
    button: 'bg-purple-500 hover:bg-purple-600',
  },
}

const categories = ['All', 'Hospital', 'Clinic', 'Bank', 'Government']

const categoryFilterColors = {
  All: 'bg-indigo-500 text-white border-indigo-500',
  Hospital: 'bg-blue-500 text-white border-blue-500',
  Clinic: 'bg-green-500 text-white border-green-500',
  Bank: 'bg-amber-500 text-white border-amber-500',
  Government: 'bg-purple-500 text-white border-purple-500',
}

function Home() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  // -------------------------------------------------------------------------
  // BACKEND: Replace hardcodedServiceCenters with this state when API is ready
  // const [serviceCenters, setServiceCenters] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState('')
  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // BACKEND: Uncomment this useEffect when backend is ready
  // It will fetch real service centers from the database
  //
  // useEffect(() => {
  //   const fetchCenters = async () => {
  //     try {
  //       const response = await getServiceCenters()
  //       setServiceCenters(response.data.serviceCenters)
  //     } catch (err) {
  //       setError('Failed to load service centers')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchCenters()
  // }, [])
  // -------------------------------------------------------------------------

  // BACKEND: Replace hardcodedServiceCenters with serviceCenters (from state)
  const serviceCenters = hardcodedServiceCenters

  const filtered = serviceCenters.filter((center) => {
    const matchesSearch =
      center.name.toLowerCase().includes(search.toLowerCase()) ||
      center.category.toLowerCase().includes(search.toLowerCase()) ||
      center.type.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      activeCategory === 'All' || center.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-indigo-200 text-sm font-medium mb-1">
            Welcome to QueueLess
          </p>
          <h1 className="text-3xl font-bold text-white mb-2">
            Find a Service Center
          </h1>
          <p className="text-indigo-100 text-sm mb-8">
            Join a digital queue and skip the wait
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by name, category or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-gray-800 bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
            />
          </div>

          {/* Summary Pills */}
          {/* BACKEND: Replace hardcoded 23 with real active counters count from API */}
          <div className="flex items-center gap-4 mt-6 flex-wrap justify-center">
            <div className="flex items-center gap-2 bg-white/10 text-white text-xs font-medium px-4 py-2 rounded-full">
              <span>🏢</span>
              <span>{serviceCenters.length} Centers Available</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 text-white text-xs font-medium px-4 py-2 rounded-full">
              <span>✅</span>
              <span>23 Active Counters</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-12">

        {/* Category Filter + Results Count */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-medium px-4 py-2 rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? categoryFilterColors[cat]
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-300'
              }`}
            >
              {cat}
            </button>
          ))}

          <span className="ml-auto text-sm font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-full">
            {filtered.length} {filtered.length === 1 ? 'center' : 'centers'} found
          </span>
        </div>

        {/* No results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              No centers found for "{search}"
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Try searching by hospital, bank or government
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((center) => {
              const config = categoryConfig[center.category]
              return (
                <div
                  key={center.id}
                  className={`rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${config.bg} ${config.border}`}
                >
                  {/* Card Top */}
                  <div className="p-5 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{config.icon}</span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.badge}`}>
                          {center.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                        </span>
                        <span className="text-xs text-green-500 font-medium">Live</span>
                      </div>
                    </div>

                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-0.5">
                      {center.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {center.type}
                    </p>
                  </div>

                  {/* Stats */}
                  {/* BACKEND: waiting and waitTime will come from real API response */}
                  <div className="grid grid-cols-3 gap-0 border-t border-white/60 dark:border-white/5">
                    <div className="p-3 text-center border-r border-white/60 dark:border-white/5">
                      <p className={`text-base font-bold ${config.stat}`}>{center.waiting}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Waiting</p>
                    </div>
                    <div className="p-3 text-center border-r border-white/60 dark:border-white/5">
                      <p className={`text-base font-bold ${config.stat}`}>{center.waitTime}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Est. Wait</p>
                    </div>
                    <div className="p-3 text-center">
                      <p className={`text-base font-bold ${config.stat}`}>{center.counters}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Counters</p>
                    </div>
                  </div>

                  {/* Button */}
                  {/* BACKEND: center.id will be MongoDB _id from real data */}
                  <div className="p-4 pt-3">
                    <button
                      onClick={() => navigate(`/service/${center.id}`)}
                      className={`w-full text-white text-sm font-medium py-2.5 rounded-xl transition-all duration-200 ${config.button}`}
                    >
                      View & Join Queue
                    </button>
                  </div>

                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}

export default Home