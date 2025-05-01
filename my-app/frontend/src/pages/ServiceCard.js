import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceCard = ({ img, title, desc, variants }) => {
  const [showDetails, setShowDetails] = useState(false);

  const detailCards = [
    {
      img: 'https://via.placeholder.com/150/Service1',
      text: 'Detail point one about this service.',
    },
    {
      img: 'https://via.placeholder.com/150/Service2',
      text: 'Another benefit or highlight.',
    },
    {
      img: 'https://via.placeholder.com/150/Service3',
      text: 'Why this service stands out.',
    },
    {
      img: 'https://via.placeholder.com/150/Service4',
      text: 'Additional info or testimonial snippet.',
    },
  ];

  return (
    <motion.div className="service-card" variants={variants}>
      <img src={img} alt={`${title} service`} loading="lazy" />
      <h3>{title}</h3>
      <p>{desc}</p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="card-btn"
        aria-label={`Learn more about ${title}`}
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        Learn More
      </motion.button>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="detail-card-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => setShowDetails(true)}
            onMouseLeave={() => setShowDetails(false)}
          >
            {detailCards.map((card, index) => (
              <motion.div key={index} className="detail-card" whileHover={{ scale: 1.03 }}>
                <img src={card.img} alt={`Detail ${index + 1}`} />
                <p>{card.text}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
