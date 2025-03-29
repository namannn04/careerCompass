import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const InputField = ({ name, type, placeholder, value, onChange, icon: Icon }) => (
  <div className="relative mb-6">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <input
      type={type}
      name={name}
      className="w-full pl-12 py-4 border border-gray-500 rounded-lg bg-black/70 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-600 focus:border-transparent"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

const Toast = ({ message, type }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`}
  >
    {message}
  </motion.div>
);

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_jym7qu6", // EmailJS Service ID
        "template_jkxj5zp", // EmailJS Template ID
        {
          from_name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        },
        "WIs0Ho4ET-M8EBlF3" // Public Key
      );
      setToast({ message: "Message sent successfully!", type: "success" });
      setFormState({ name: "", email: "", subject: "", message: "" });
    } catch {
      setToast({ message: "Failed to send message. Please try again.", type: "error" });
    }
    setIsSubmitting(false);

    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div id="contact" className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden">
      {/* Notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl p-8 rounded-2xl bg-black/70 backdrop-blur-md shadow-2xl"
      >
        <h2 className="text-4xl font-extrabold text-center text-gold-400 mb-4">
          Let's Connect!
        </h2>
        <p className="text-center text-lg font-bold text-gold-400 mb-8">
          Have a question? Drop us a message, and we'll get back to you soon.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            name="name"
            type="text"
            placeholder="Your Name"
            value={formState.name}
            onChange={handleChange}
            icon={(props) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                {...props}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          />
          <InputField
            name="email"
            type="email"
            placeholder="Your Email"
            value={formState.email}
            onChange={handleChange}
            icon={(props) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                {...props}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            )}
          />
          <textarea
            name="message"
            rows="5"
            className="w-full p-4 border border-gray-500 rounded-lg bg-black/70 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-600 focus:border-transparent"
            placeholder="Your Message"
            value={formState.message}
            onChange={handleChange}
            required
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(255, 215, 0, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 text-lg font-bold rounded-lg transition-all bg-gradient-to-r from-purple-700 to-gold-500 text-white hover:shadow-lg hover:shadow-gold-400"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
