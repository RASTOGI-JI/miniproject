import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Banner() {
  // Initialize AOS for animations
  useEffect(() => {
    // Wait for DOM to be ready
    setTimeout(() => {
      if (window.AOS) {
        window.AOS.refresh();
      }
    }, 100);
  }, []);

  return (
    <div className="relative h-[80vh] w-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-center text-white px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white opacity-10"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 20, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-white opacity-10"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 30, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-10 left-1/4 w-40 h-40 rounded-full bg-white opacity-10"
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -20, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 9,
            ease: "easeInOut" 
          }}
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Plan Your Dream Wedding
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Let us bring your vision to life with elegance and ease.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link 
            to="/pricing" 
            className="px-8 py-3 bg-white text-pink-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
          >
            Explore Packages
          </Link>
          <Link 
            to="/contact" 
            className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Banner;