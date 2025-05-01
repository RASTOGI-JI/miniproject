import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Sarah & Michael',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    quote: 'theWedding made our planning process so much easier! The budget tracker saved us from so many headaches.',
    location: 'New York, NY'
  },
  {
    id: 2,
    name: 'Jessica & David',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    quote: 'We loved how easy it was to manage our guest list and track RSVPs. Highly recommend to all couples!',
    location: 'Chicago, IL'
  },
  {
    id: 3,
    name: 'Emily & James',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    quote: 'The vendor recommendations were spot on! We found our perfect photographer and venue through theWedding.',
    location: 'Austin, TX'
  }
];

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(null);
  
  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('right');
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const nextSlide = () => {
    setDirection('right');
    setCurrent(prev => (prev + 1) % testimonials.length);
  };
  
  const prevSlide = () => {
    setDirection('left');
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const variants = {
    enter: (direction) => ({
      x: direction === 'right' ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction === 'right' ? -300 : 300,
      opacity: 0
    })
  };
  
  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Couples Say</h2>
        
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white rounded-xl shadow-lg p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-pink-100">
                  <img 
                    src={testimonials[current].image} 
                    alt={testimonials[current].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <FaQuoteLeft className="text-pink-200 text-4xl mb-4" />
                  <p className="text-gray-700 text-lg italic mb-6">{testimonials[current].quote}</p>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{testimonials[current].name}</h4>
                    <p className="text-gray-500">{testimonials[current].location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 focus:outline-none"
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > current ? 'right' : 'left');
                setCurrent(index);
              }}
              className={`w-3 h-3 rounded-full ${
                index === current ? 'bg-pink-500' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestimonialCarousel;