import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRing, FaCalendarCheck, FaCamera, FaEnvelope, FaInstagram, FaTwitter, FaPinterest, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Home() {
  // Newsletter Form State
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setFormStatus('Thank you for subscribing!');
      setEmail('');
      setTimeout(() => setFormStatus(''), 3000);
    } else {
      setFormStatus('Please enter a valid email.');
    }
  };

  // Testimonials Carousel State
  const testimonials = [
    { 
      quote: 'TheWedding made our planning effortless and fun!', 
      couple: 'Emma & Liam', 
      img: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      location: 'New York, NY'
    },
    { 
      quote: 'The budget tracker saved us from so many headaches!', 
      couple: 'Sophia & Noah', 
      img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      location: 'Chicago, IL'
    },
    { 
      quote: 'We found our perfect venue through theWedding!', 
      couple: 'Olivia & William', 
      img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      location: 'Austin, TX'
    },
  ];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('right');
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setDirection('right');
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection('left');
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Banner />

      {/* Hero Section with Floating Elements */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-pink-100 opacity-50 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-purple-100 opacity-50 animate-float animation-delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 rounded-full bg-pink-200 opacity-30 animate-float animation-delay-2000"></div>
        
        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-serif">Plan Your Dream Wedding</h1>
          <p className="text-xl text-gray-600 mb-10">Create a celebration as unique as your love story with our all-in-one platform.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="/budget"
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              aria-label="Start planning your wedding"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Planning <FaHeart />
            </motion.a>
            <motion.a
              href="/service"
              className="px-8 py-3 bg-white border border-gray-300 text-gray-800 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
              aria-label="Explore wedding vendors"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)" }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Vendors <FaChevronRight className="text-sm" />
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Features Highlight with Improved Cards */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 font-serif">Why Choose TheWedding?</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Our comprehensive tools make wedding planning simple, organized, and enjoyable.</p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Personalized Planning', desc: 'Tailored tools for your unique vision and style.', icon: <FaCalendarCheck /> },
            { title: 'Trusted Vendors', desc: 'Connect with top professionals in your area.', icon: <FaCamera /> },
            { title: 'Budget Tracker', desc: 'Smart tools to manage costs and stay on budget.', icon: <FaRing /> },
          ].map((feature, i) => (
            <motion.div
              className="bg-white p-8 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 text-center border border-gray-100"
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl text-primary-600 mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vendors Highlight with Improved Cards */}
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 font-serif">Discover Top Wedding Vendors</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Find the perfect professionals to bring your wedding vision to life.</p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Photographers', desc: 'Capture every moment beautifully.', img: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
            { name: 'Venues', desc: 'Find the perfect setting for your day.', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
            { name: 'Caterers', desc: 'Delight your guests with amazing food.', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
          ].map((vendor, i) => (
            <motion.div
              className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 group"
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${vendor.img})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{vendor.name}</h3>
                <p className="text-gray-600 mb-4">{vendor.desc}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full hover:shadow-md transition-all duration-300 flex items-center gap-2"
                  aria-label={`View ${vendor.name}`}
                  onClick={() => console.log(`View ${vendor.name} clicked`)}
                >
                  View {vendor.name} <FaChevronRight className="text-xs" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel with Improved Design */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 font-serif">Real Love Stories</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Hear from couples who planned their perfect day with us.</p>
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentTestimonial}
              custom={direction}
              initial={{ opacity: 0, x: direction === 'right' ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'right' ? -100 : 100 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 p-8 rounded-xl shadow-soft text-center md:text-left md:flex items-center gap-8"
            >
              <div className="w-24 h-24 mx-auto md:mx-0 mb-4 md:mb-0 rounded-full bg-cover bg-center border-4 border-white shadow-md flex-shrink-0" 
                   style={{ backgroundImage: `url(${testimonials[currentTestimonial].img})` }}>
              </div>
              <div>
                <p className="text-xl italic text-gray-700 mb-4">"{testimonials[currentTestimonial].quote}"</p>
                <h4 className="font-semibold text-gray-800">– {testimonials[currentTestimonial].couple}</h4>
                <p className="text-gray-500 text-sm">{testimonials[currentTestimonial].location}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 focus:outline-none"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentTestimonial ? 'right' : 'left');
                  setCurrentTestimonial(i);
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  i === currentTestimonial ? 'bg-primary-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`View testimonial ${i + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Planner with Improved Design */}
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 font-serif">Your Wedding in 4 Simple Steps</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">We've simplified the planning process so you can focus on what matters most.</p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: 'Sign Up', desc: 'Create your free account.', icon: <FaHeart /> },
            { step: 'Build Your Plan', desc: 'Customize your vision.', icon: <FaRing /> },
            { step: 'Track Everything', desc: 'Manage tasks and budget.', icon: <FaCalendarCheck /> },
            { step: 'Celebrate', desc: 'Enjoy your perfect day!', icon: <FaCamera /> },
          ].map((step, i) => (
            <motion.div
              className="bg-white p-8 rounded-xl shadow-soft text-center relative overflow-hidden border border-gray-100"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            >
              {/* Decorative line connecting steps */}
              {i < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-pink-200 z-0"></div>
              )}
              
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-pink-50 flex items-center justify-center text-3xl text-primary-600 relative z-10">
                {step.icon}
              </div>
              <span className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white flex items-center justify-center font-bold">{i + 1}</span>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{step.step}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Inspiration Gallery with Improved Hover Effects */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 font-serif">Wedding Inspiration</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Explore different styles to find what speaks to you.</p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { style: 'boho', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc' },
            { style: 'classic', img: 'https://images.unsplash.com/photo-1519227355998-9b2f5e7c3698' },
            { style: 'modern', img: 'https://images.unsplash.com/photo-1519337265831-4fded23cafeb' },
          ].map((item, i) => (
            <motion.div
              className="relative overflow-hidden rounded-xl shadow-md group cursor-pointer"
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="h-64 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                   style={{ backgroundImage: `url(${item.img})` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                  <p className="text-white font-semibold text-xl mb-2">
                    {item.style.charAt(0).toUpperCase() + item.style.slice(1)} Weddings
                  </p>
                  <p className="text-white/80 text-sm transform opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-4 group-hover:translate-y-0">
                    Explore {item.style} wedding ideas and inspiration
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup with Improved Design */}
      <section className="py-16 px-4 bg-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-pink-100 opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-purple-100 opacity-50"></div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2 font-serif"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Stay Inspired <FaEnvelope className="text-primary-600" />
          </motion.h2>
          <p className="text-gray-600 mb-8">Join our newsletter for wedding tips, trends, and exclusive offers.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email for newsletter"
              className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 flex-grow max-w-md shadow-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-md transition-all duration-300"
            >
              Subscribe
            </motion.button>
          </form>
          {formStatus && (
            <motion.p
              className={`mt-4 ${formStatus.includes('Thank') ? 'text-green-600' : 'text-red-600'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {formStatus}
            </motion.p>
          )}
        </div>
      </section>

      {/* Social Media with Improved Design */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 font-serif">Join Our Community</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">Follow us on social media for daily inspiration and wedding planning tips.</p>
          <div className="flex justify-center gap-6">
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              aria-label="Follow us on Instagram"
              className="text-3xl text-primary-600 hover:text-primary-700"
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              aria-label="Follow us on Pinterest"
              className="text-3xl text-primary-600 hover:text-primary-700"
            >
              <FaPinterest />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              aria-label="Follow us on Twitter"
              className="text-3xl text-primary-600 hover:text-primary-700"
            >
              <FaTwitter />
            </motion.a>
          </div>
        </div>
      </section>

      {/* CTA with Improved Design */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-2 border-white"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border-2 border-white"></div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-4 font-serif"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Begin Your Love Story
          </motion.h2>
          <p className="text-xl mb-8 opacity-90">Let us make your wedding day unforgettable.</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
            aria-label="Join now for free"
            onClick={() => console.log('Join Now clicked')}
          >
            Join Now for Free
          </motion.button>
        </div>
      </section>
    </div>
  );
}

export default Home;
