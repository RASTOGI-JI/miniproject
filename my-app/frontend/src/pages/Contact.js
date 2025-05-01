import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock, FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from 'react-icons/fa';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 1000, once: true });
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Failed to send message. Please try again later.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // FAQ content
  const faqs = [
    { q: 'How soon will I get a response?', a: 'We aim to reply within 24-48 hours.' },
    { q: 'Can you help with international weddings?', a: 'Yes, we specialize in both local and destination weddings!' },
    { q: 'What services do you offer?', a: 'Full planning, vendor coordination, budgeting, and more.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="py-16 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center" data-aos="fade-down">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Plan Your Perfect Wedding With Us 💍</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Have questions or ready to start? Contact our team—we're here to make your dream day a reality.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <motion.section 
          className="bg-white rounded-xl shadow-soft p-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          data-aos="fade-right"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  name="name"
                  placeholder="Your Name"
                  onChange={handleChange}
                  value={formData.name}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  name="email"
                  placeholder="Your Email"
                  type="email"
                  onChange={handleChange}
                  value={formData.email}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <input
                  name="phone"
                  placeholder="Your Phone (Optional)"
                  type="tel"
                  onChange={handleChange}
                  value={formData.phone}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <textarea
                  name="message"
                  placeholder="Tell us about your wedding..."
                  rows="5"
                  onChange={handleChange}
                  value={formData.message}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
            {submitted && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-green-50 text-green-700 text-center"
              >
                Thank you! Your message has been sent successfully.
              </motion.p>
            )}
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-50 text-red-700 text-center"
              >
                {error}
              </motion.p>
            )}
          </form>
        </motion.section>

        {/* Contact Info */}
        <motion.section 
          className="bg-gray-50 rounded-xl shadow-soft p-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          data-aos="fade-left"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">Get in Touch</h2>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt />
              </div>
              <span className="text-gray-700">123 Bridal Lane, Love City, CA 98765</span>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                <FaEnvelope />
              </div>
              <a href="mailto:support@thewedding.com" className="text-primary-600 hover:text-primary-700 transition-colors">
                support@thewedding.com
              </a>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                <FaPhone />
              </div>
              <a href="tel:+919528239390" className="text-primary-600 hover:text-primary-700 transition-colors">
                +91 9528239390
              </a>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                <FaClock />
              </div>
              <span className="text-gray-700">Mon – Fri: 9 AM – 6 PM (PST)</span>
            </li>
          </ul>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white flex items-center justify-center hover:from-purple-700 hover:to-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                aria-label="Pinterest"
              >
                <FaPinterestP />
              </a>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Additional Content: Quick Help & FAQs */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10" data-aos="fade-up">
        <div className="bg-white rounded-xl shadow-soft p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 font-serif">Need Assistance With?</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <span className="text-2xl">💐</span>
              <span className="text-gray-700">Finding the Perfect Vendors</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-2xl">💌</span>
              <span className="text-gray-700">Crafting Elegant Invitations</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-2xl">📅</span>
              <span className="text-gray-700">Building Your Timeline</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-2xl">💸</span>
              <span className="text-gray-700">Managing Your Budget</span>
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 font-serif">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Google Map */}
      <section className="max-w-6xl mx-auto px-4 py-12" data-aos="zoom-in">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 font-serif">Find Us</h2>
        <div className="rounded-xl overflow-hidden shadow-soft h-96">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509325!2d-122.41941548468144!3d37.77492977975966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808f7e0b0c1f%3A0x9d8e6e8e9e8e8e8e!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1631234567890"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;