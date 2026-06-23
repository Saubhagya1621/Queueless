import { useState, useEffect } from "react";
import { getServiceCenterById } from "../utils/api";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function ServiceDetail() {
  const { id } = useParams();

  const [center, setCenter] = useState(null);
  const [services, setServices] = useState([]);
  const [counters, setCounters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchCenter = async () => {
      try {
        setLoading(true);

        const data = await getServiceCenterById(id);

        setCenter(data);
        setServices(data.services || []);
        setCounters(data.counters || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load service center");
      } finally {
        setLoading(false);
      }
    };

    fetchCenter();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }
  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

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
