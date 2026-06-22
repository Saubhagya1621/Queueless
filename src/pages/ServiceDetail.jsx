import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const serviceCenters = {
  1: {
    name: "City Care Hospital",
    type: "Multi-speciality Hospital · OPD Services",
    category: "Hospital",
    waiting: 12,
    waitTime: "25 min",
    counters: 3,
  },
  2: {
    name: "District Hospital",
    type: "Government Hospital · General Services",
    category: "Hospital",
    waiting: 25,
    waitTime: "40 min",
    counters: 5,
  },
  3: {
    name: "Apollo Clinic",
    type: "Private Clinic · Specialist Care",
    category: "Hospital",
    waiting: 8,
    waitTime: "15 min",
    counters: 2,
  },
  4: {
    name: "HealthPlus Clinic",
    type: "General Physician Clinic",
    category: "Clinic",
    waiting: 6,
    waitTime: "12 min",
    counters: 2,
  },

  5: {
    name: "MedCare Centre",
    type: "Diagnostic & Consultation",
    category: "Clinic",
    waiting: 10,
    waitTime: "20 min",
    counters: 3,
  },

  6: {
    name: "WellLife Clinic",
    type: "Family Health Clinic",
    category: "Clinic",
    waiting: 4,
    waitTime: "8 min",
    counters: 1,
  },

  7: {
    name: "SBI Bank Branch",
    type: "State Bank of India",
    category: "Bank",
    waiting: 18,
    waitTime: "30 min",
    counters: 4,
  },

  8: {
    name: "HDFC Bank",
    type: "Private Sector Bank",
    category: "Bank",
    waiting: 10,
    waitTime: "18 min",
    counters: 3,
  },

  9: {
    name: "Bank of Baroda",
    type: "Public Sector Bank",
    category: "Bank",
    waiting: 14,
    waitTime: "22 min",
    counters: 3,
  },

  10: {
    name: "Regional Passport Office",
    type: "Government Office",
    category: "Government",
    waiting: 35,
    waitTime: "55 min",
    counters: 6,
  },

  11: {
    name: "RTO Office",
    type: "Regional Transport Office",
    category: "Government",
    waiting: 20,
    waitTime: "35 min",
    counters: 3,
  },

  12: {
    name: "Ration Card Office",
    type: "Civil Supplies Department",
    category: "Government",
    waiting: 28,
    waitTime: "45 min",
    counters: 4,
  },
};

const servicesByCategory = {
  Hospital: [
    { id: 1, name: "General Consultation", duration: "10-15 mins" },
    { id: 2, name: "Blood Test", duration: "5-10 mins" },
    { id: 3, name: "X-Ray Scan", duration: "15-20 mins" },
    { id: 4, name: "Pharmacy Pickup", duration: "5 mins" },
  ],

  Clinic: [
    { id: 1, name: "Doctor Consultation", duration: "10 mins" },
    { id: 2, name: "Vaccination", duration: "5 mins" },
    { id: 3, name: "Health Checkup", duration: "20 mins" },
  ],

  Bank: [
    { id: 1, name: "Cash Deposit", duration: "5 mins" },
    { id: 2, name: "Cash Withdrawal", duration: "5 mins" },
    { id: 3, name: "Account Opening", duration: "20 mins" },
    { id: 4, name: "Passbook Update", duration: "3 mins" },
  ],

  Government: [
    { id: 1, name: "Document Verification", duration: "15 mins" },
    { id: 2, name: "Application Submission", duration: "10 mins" },
    { id: 3, name: "Token Collection", duration: "5 mins" },
  ],
};
const countersByCategory = {
  Hospital: [
    {
      id: 1,
      name: "Counter 1",
      service: "General Consultation",
      waiting: 12,
      wait: "20 min",
    },
    {
      id: 2,
      name: "Counter 2",
      service: "Blood Test",
      waiting: 5,
      wait: "10 min",
    },
    {
      id: 3,
      name: "Counter 3",
      service: "X-Ray Scan",
      waiting: 3,
      wait: "6 min",
    },
  ],

  Clinic: [
    {
      id: 1,
      name: "Counter 1",
      service: "Doctor Consultation",
      waiting: 8,
      wait: "12 min",
    },
    {
      id: 2,
      name: "Counter 2",
      service: "Vaccination",
      waiting: 4,
      wait: "8 min",
    },
    {
      id: 3,
      name: "Counter 3",
      service: "Health Checkup",
      waiting: 2,
      wait: "5 min",
    },
  ],

  Bank: [
    {
      id: 1,
      name: "Counter 1",
      service: "Cash Deposit",
      waiting: 10,
      wait: "15 min",
    },
    {
      id: 2,
      name: "Counter 2",
      service: "Cash Withdrawal",
      waiting: 6,
      wait: "10 min",
    },
    {
      id: 3,
      name: "Counter 3",
      service: "Account Opening",
      waiting: 4,
      wait: "20 min",
    },
  ],

  Government: [
    {
      id: 1,
      name: "Counter 1",
      service: "Document Verification",
      waiting: 15,
      wait: "25 min",
    },
    {
      id: 2,
      name: "Counter 2",
      service: "Application Submission",
      waiting: 8,
      wait: "15 min",
    },
    {
      id: 3,
      name: "Counter 3",
      service: "Token Collection",
      waiting: 5,
      wait: "10 min",
    },
  ],
};

function ServiceDetail() {
  const { id } = useParams();

  const center = serviceCenters[id];

  const services = servicesByCategory[center?.category] || [];

  const counters = countersByCategory[center?.category] || [];

  const [token, setToken] = useState(null);

  if (!center) {
    return <div className="p-10 text-center">Service Center Not Found</div>;
  }

  const handleJoinQueue = (counter) => {
    let status = "Waiting";

    if (counter.waiting <= 3) {
      status = "Serving";
    } else if (counter.waiting <= 8) {
      status = "Called";
    }

    const tokenData = {
      number: `A-${100 + counter.id}`,
      center: center.name,
      counter: counter.name,
      service: counter.service,

      position: counter.waiting,
      wait: counter.wait,

      progress: Math.max(10, Math.min(90, 100 - counter.waiting * 5)),

      status,
    };

    localStorage.setItem("currentToken", JSON.stringify(tokenData));

    setToken(tokenData);
  };
  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 font-poppins transition-colors duration-300 pt-20">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 pt-24 pb-7">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#111827] dark:text-white">
            {center.name}
          </h1>

          <p className="text-sm text-[#6B7280] dark:text-gray-400 mt-1">
            {center.type}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
          <h2 className="text-base font-medium text-[#111827] dark:text-white mb-4">
            Current Queue Status
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-semibold text-[#6366F1]">
                {center.waiting}
              </p>
              <p className="text-xs text-[#6B7280] mt-1">People Waiting</p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-[#6366F1]">
                {center.waitTime}
              </p>
              <p className="text-xs text-[#6B7280] mt-1">Estimated Wait</p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-[#6366F1]">
                {center.counters}
              </p>
              <p className="text-xs text-[#6B7280] mt-1">Active Counters</p>
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
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
          <h2 className="text-base font-medium text-[#111827] dark:text-white mb-4">
            Available Counters
          </h2>

          <div className="space-y-4">
            {counters.map((counter) => (
              <div
                key={counter.id}
                className="flex items-center justify-between border border-gray-100 dark:border-gray-800 rounded-xl p-4"
              >
                <div>
                  <p className="font-medium text-[#111827] dark:text-white">
                    {counter.name}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {counter.service}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {counter.waiting} waiting • ~{counter.wait}
                  </p>
                </div>

                <button
                  onClick={() => handleJoinQueue(counter)}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 cursor-pointer"
                >
                  Join Queue
                </button>
              </div>
            ))}
          </div>
        </div>

        {token && (
          <div className="bg-[#ECFDF5] dark:bg-gray-900 border border-[#10B981]/30 dark:border-gray-800 rounded-2xl p-5 text-center">
            <p className="text-lg font-semibold text-[#111827] dark:text-white">
              You've joined the queue
            </p>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-[#111827] dark:text-white">
                You've joined {token.counter}
              </p>

              <p className="text-[#111827] dark:text-white">
                Token: {token.number}
              </p>

              <p className="text-[#111827] dark:text-white">
                Service: {token.service}
              </p>

              <p className="text-[#111827] dark:text-white">
                Estimated Wait: {token.wait}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ServiceDetail;
