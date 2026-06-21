import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

const hospitals = {
  1: {
    name: 'City Care Hospital',
    type: 'Multi-speciality Hospital · OPD Services',
    waiting: 12,
    waitTime: '25 min',
    counters: 3,
  },
  2: {
    name: 'District Hospital',
    type: 'Government Hospital · General Services',
    waiting: 25,
    waitTime: '40 min',
    counters: 5,
  },
  3: {
    name: 'Apollo Clinic',
    type: 'Private Clinic · Specialist Care',
    waiting: 8,
    waitTime: '15 min',
    counters: 2,
  },
}

const services = [
  { id: 1, name: 'General Consultation', duration: '10-15 mins' },
  { id: 2, name: 'Blood Test', duration: '5-10 mins' },
  { id: 3, name: 'X-Ray Scan', duration: '15-20 mins' },
  { id: 4, name: 'Pharmacy Pickup', duration: '5 mins' },
]

function ServiceDetail() {
  const { id } = useParams()

  const hospital = hospitals[id]

  const [token, setToken] = useState(null)

  if (!hospital) {
    return (
      <div className="p-10 text-center">
        Hospital Not Found
      </div>
    )
  }

  const handleJoinQueue = () => {
    setToken({
      number: 'A-047',
      wait: hospital.waiting,
    })
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 font-poppins transition-colors duration-300 pt-20">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 pt-10 pb-7">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#111827] dark:text-white">
            {hospital.name}
          </h1>

          <p className="text-sm text-[#6B7280] dark:text-gray-400 mt-1">
            {hospital.type}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
          <h2 className="text-base font-medium text-[#111827] dark:text-white mb-4">
            Current Queue Status
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-semibold text-[#6366F1]">
                {hospital.waiting}
              </p>
              <p className="text-xs text-[#6B7280] mt-1">
                People Waiting
              </p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-[#6366F1]">
                {hospital.waitTime}
              </p>
              <p className="text-xs text-[#6B7280] mt-1">
                Estimated Wait
              </p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-[#6366F1]">
                {hospital.counters}
              </p>
              <p className="text-xs text-[#6B7280] mt-1">
                Active Counters
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
         <h2 className="text-base font-medium text-[#111827] dark:text-white mb-4">
            Services Offered
          </h2>

          <ul className="divide-y divide-gray-100">
            {services.map((service) => (
              <li
                key={service.id}
                className="flex items-center justify-between py-3"
              >
                <span className="text-sm text-[#111827] dark:text-white">
                  {service.name}
                </span>

                <span className="text-xs text-[#6B7280]">
                  {service.duration}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {!token && (
          <button
            onClick={handleJoinQueue}
            className="w-full bg-[#6366F1] text-white font-medium py-3 rounded-xl hover:bg-[#4F46E5] transition-colors"
          >
            Join Queue
          </button>
        )}

        {token && (
          <div className="bg-[#ECFDF5] dark:bg-gray-900 border border-[#10B981]/30 dark:border-gray-800 rounded-2xl p-5 text-center">
            <p className="text-lg font-semibold text-[#111827] dark:text-white">
              You've joined the queue
            </p>

            <p className="text-lg font-semibold text-[#111827] dark:text-white">
              Your token is {token.number} — estimated wait {token.wait} minutes
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default ServiceDetail