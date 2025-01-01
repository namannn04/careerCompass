import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission with a 50% chance of success
    if (Math.random() > 0.5) {
      setShowSuccessPopup(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setShowErrorPopup(true);
    }
  };

  const Popup = ({ isSuccess, onClose }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className={`${isSuccess ? 'bg-green-500' : 'bg-red-500'} text-white p-8 rounded-lg shadow-lg text-center`}>
        <h3 className="text-2xl font-bold mb-4">{isSuccess ? 'Message Sent!' : 'Oops!'}</h3>
        <p>{isSuccess ? 'Your message has been successfully sent.' : 'Something went wrong. Please try again.'}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className={`mt-4 bg-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSuccess ? 'text-green-500' : 'text-red-500'}`}
        >
          Close
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="bg-gray-800 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <motion.h2 
            className="text-3xl font-bold text-purple-400 mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Get in Touch
          </motion.h2>
          {['name', 'email', 'subject'].map((field) => (
            <div key={field} className="mb-4">
              <motion.input 
                whileFocus={{ scale: 1.05 }}
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-purple-500 transition duration-300"
                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                required
              />
            </div>
          ))}
          <div className="mb-6">
            <motion.textarea 
              whileFocus={{ scale: 1.05 }}
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-purple-500 transition duration-300"
              rows={4}
              placeholder="Your Message"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Send Message
            </motion.button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 YourCompany. All rights reserved.
        </p>
      </motion.div>

      <AnimatePresence>
        {showSuccessPopup && (
          <Popup isSuccess={true} onClose={() => setShowSuccessPopup(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showErrorPopup && (
          <Popup isSuccess={false} onClose={() => setShowErrorPopup(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;

