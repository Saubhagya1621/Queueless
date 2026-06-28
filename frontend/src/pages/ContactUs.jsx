import { useState } from "react";
import { sendContactMessage } from "../utils/api";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await sendContactMessage(name, email, message);
      toast.success("Message sent successfully! We'll get back to you soon.");

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-linear-to-br dark:from-[#0a0a23] dark:via-[#1e1145] dark:to-[#2a0e3d] transition-colors duration-300">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 pt-28 pb-10">
        <div className="bg-white dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-100 dark:border-gray-800 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)] transition-all duration-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Contact Us
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Have questions, feedback or suggestions?
            <br />
            Fill out the form below and we'll get back to you.
          </p>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900"
            />

            <textarea
              rows="5"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-indigo-500 hover:bg-indigo-600 py-3 font-medium text-white transition-all duration-200 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Social Links */}
          <div className="mt-10 border-t pt-6">
            <h2 className="font-semibold text-gray-800 dark:text-white">
              Connect With Us
            </h2>

            <div className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
              <p>📧 support@queueless.com</p>

              <p>📞 +91 XXXXX XXXXX</p>

              <p>📍 MMMUT Gorakhpur, Uttar Pradesh</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ContactUs;
