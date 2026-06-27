import Navbar from "../components/Navbar";

function AboutUs() {
  const team = [
    {
      name: "Saubhagya Srivastava",
      role: "Full Stack Lead & Team Coordinator",
    },
    {
      name: "Sarvesh Kumar",
      role: "Backend Developer",
    },
    {
      name: "Shalini Yadav",
      role: "Frontend Developer",
    },
    {
      name: "Sumit Kumar",
      role: "Testing & Documentation",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-400/20 dark:bg-indigo-700/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-violet-400/20 dark:bg-violet-700/20 rounded-full blur-3xl pointer-events-none"></div>
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 pt-28 pb-10">
        <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-gray-800 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(99,102,241,0.35)] dark:hover:shadow-[0_20px_60px_rgba(99,102,241,0.45)] transition-all duration-300 p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            About QueueLess
          </h1>

          <p className="mt-3 text-indigo-500 font-semibold text-lg">
            Skip the queue, not your turn.
          </p>

          <p className="mt-6 text-gray-600 dark:text-gray-300 leading-8">
            QueueLess is a smart digital token management and appointment
            platform that enables users to join virtual queues, track waiting
            time in real-time and receive live queue updates without standing in
            physical lines.
          </p>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold dark:text-white">
              Our Mission
            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-8">
              Our mission is to eliminate unnecessary waiting by providing
              organizations with an efficient digital queue management system
              while offering customers a seamless experience.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold dark:text-white">
              Technology Stack
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
              {[
                "React",
                "Node.js",
                "Express.js",
                "MongoDB",
                "Socket.io",
                "Tailwind CSS",
              ].map((tech) => (
                <div
                  key={tech}
                  className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5 text-center font-medium text-gray-700 dark:text-white transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-[0_10px_25px_rgba(99,102,241,0.25)] dark:hover:shadow-[0_10px_30px_rgba(99,102,241,0.45)]"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold dark:text-white">
              Team Members
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-5">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-[0_10px_25px_rgba(99,102,241,0.25)] dark:hover:shadow-[0_10px_30px_rgba(99,102,241,0.45)]"
                >
                  <h3 className="font-semibold text-lg dark:text-white">
                    {member.name}
                  </h3>

                  <p className="text-indigo-500 mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AboutUs;
