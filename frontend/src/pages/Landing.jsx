import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

function Landing() {
  const features = [
    {
      icon: '⚡',
      title: 'Real Time Updates',
      description: 'Your queue position updates instantly without refreshing the page. Always know exactly where you stand.',
    },
    {
      icon: '🔔',
      title: 'Smart Notifications',
      description: 'Get notified when your turn is approaching. No more anxious waiting or missing your slot.',
    },
    {
      icon: '🚶',
      title: 'Leave and Come Back',
      description: 'Go grab a coffee or sit in your car. The app tells you exactly when to walk back in.',
    },
    {
      icon: '🎯',
      title: 'Accurate Wait Time',
      description: 'We estimate your wait based on real queue speed — not just your position number.',
    },
    {
      icon: '🔄',
      title: 'Hybrid Queue',
      description: 'Walk-ins and pre-booked appointments managed together in one smooth intelligent queue.',
    },
    {
      icon: '📊',
      title: 'Operator Dashboard',
      description: 'Service staff get a clean real time dashboard to manage tokens, counters and walk-ins effortlessly.',
    },
  ]

  const testimonials = [
    {
      name: 'Ananya Sharma',
      role: 'Patient — City Hospital',
      review: 'I used to spend 2 hours waiting at the OPD. With QueueLess I waited in my car and walked in just in time. Incredible.',
      avatar: 'AS',
    },
    {
      name: 'Rohit Mehta',
      role: 'Customer — SBI Branch',
      review: 'Finally a solution that respects your time. Booked my token, went for lunch, came back right when my turn came.',
      avatar: 'RM',
    },
    {
      name: 'Priya Nair',
      role: 'Receptionist — Apollo Clinic',
      review: 'Managing walk-ins and appointments used to be chaos. The operator dashboard makes it so simple now.',
      avatar: 'PN',
    },
  ]

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-8 max-w-6xl mx-auto overflow-hidden">

        {/* Background blobs */}
        <div className="absolute top-10 left-0 w-125 h-125 bg-indigo-200/40 dark:bg-indigo-900/30 rounded-full blur-3xl -z-10" />
        <div className="absolute top-20 right-0 w-105 h-105 bg-violet-200/40 dark:bg-violet-900/30 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-87.5 h-87.5 bg-indigo-100/30 dark:bg-indigo-800/20 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* Left Side */}
          <motion.div
            className="flex-1 text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Smart Queue Management
            </div>

            <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              Skip the line. <br />
              <span className="bg-linear-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
                Not the service.
              </span>
            </h1>

            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-lg">
              Get a digital token, track your position live, and show up only when it is your turn. Simple, fast, and free.
            </p>

            <div className="flex items-center gap-4 mb-10">
              <Link
                to="/register"
                className="glow-btn text-white font-medium px-8 py-3 rounded-xl transition-all duration-200"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="text-gray-600 dark:text-gray-300 font-medium px-8 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white/70 dark:hover:bg-gray-800/70 backdrop-blur-sm transition-all duration-200"
              >
                Login
              </Link>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { icon: '✓', color: 'text-green-500', label: 'No physical waiting' },
                { icon: '⚡', color: 'text-indigo-500', label: 'Live queue updates' },
                { icon: '🔔', color: 'text-amber-500', label: 'Smart notifications' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                  <span className={`text-sm ${badge.color}`}>{badge.icon}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side — Token Card */}
          <motion.div
            className="flex-1 flex justify-center"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-full max-w-sm rounded-2xl shadow-2xl shadow-indigo-500/20 overflow-hidden">

              {/* Card gradient header */}
              <div className="bg-linear-to-br from-indigo-500 to-violet-600 px-6 pt-6 pb-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-indigo-200 text-xs font-medium uppercase tracking-wide">City Hospital</p>
                    <p className="text-white text-sm font-medium mt-0.5">OPD Consultation</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
                    </span>
                    Live
                  </div>
                </div>
                <div className="text-center py-4">
                  <p className="text-indigo-200 text-xs uppercase tracking-widest mb-1">Your Token</p>
                  <p className="text-7xl font-bold text-white tracking-tight">A-047</p>
                </div>
              </div>

              {/* Card white body */}
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl px-6 py-5 -mt-4 rounded-t-2xl">
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">3rd</p>
                    <p className="text-xs text-gray-400 mt-0.5">In Line</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-amber-500">~8m</p>
                    <p className="text-xs text-gray-400 mt-0.5">Wait</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-green-500">C-2</p>
                    <p className="text-xs text-gray-400 mt-0.5">Counter</p>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                    <span>Queue Progress</span>
                    <span>A-044 serving now</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                    <div className="bg-linear-to-r from-indigo-500 to-violet-600 h-2 rounded-full w-3/4 transition-all duration-500" />
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 mb-4">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">DR</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Attending Staff</p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Dr. Ramesh Kumar</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl px-4 py-3">
                  <span className="text-base">🔔</span>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    You will be notified when your turn is near
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-3">How it works</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-14">Three steps to never wait in line again</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '🎫', step: '1', title: 'Get Your Token', desc: 'Join the live queue from anywhere and get your digital token instantly.' },
            { icon: '📱', step: '2', title: 'Track Live', desc: 'See your position and wait time update in real time. Go wherever you want.' },
            { icon: '✅', step: '3', title: 'Arrive On Time', desc: 'Get notified when your turn is near. Walk in, get served, done.' },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              className="glass-card p-8 text-center hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] transition-all duration-300"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <div className="w-7 h-7 bg-linear-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-sm font-bold">{item.step}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="border-y border-white/20 dark:border-gray-800 py-20 px-8 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-3">Why QueueLess</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-14">Built for people who value their time</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] transition-all duration-300 cursor-default"
                whileHover={{ y: -6 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-3">What people say</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-14">Real experiences from real users</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] transition-all duration-300"
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">"{t.review}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-linear-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="relative py-20 px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-violet-600 -z-10" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-10" />

        <h2 className="text-3xl font-bold text-white mb-4">Ready to skip the queue?</h2>
        <p className="text-indigo-100 mb-8 max-w-lg mx-auto">
          Join thousands of people who have already saved hours of waiting time. It is free to get started.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-lg"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="text-white font-medium px-8 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition-all duration-200"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 dark:border-gray-800 py-8 px-8 text-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 bg-linear-to-br from-indigo-500 to-violet-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">Q</span>
          </div>
          <span className="text-gray-800 dark:text-white font-semibold">
            Queue<span className="text-indigo-500">Less</span>
          </span>
        </div>
        <p className="text-sm text-gray-400">© 2026 QueueLess. All rights reserved.</p>
      </div>

    </div>
  )
}

export default Landing