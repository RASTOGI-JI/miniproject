import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaInstagram, FaPinterest, FaFacebook, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary-900 to-secondary-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">theWedding</h3>
            <p className="text-gray-300 mb-4">
              Making your special day perfect with comprehensive wedding planning tools and inspiration.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300 transition-colors">
                <FaPinterest size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300 transition-colors">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/service" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Planning Tools */}
          <div>
            <h3 className="text-xl font-bold mb-4">Planning Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/guestlist" className="text-gray-300 hover:text-white transition-colors">Guest List</Link></li>
              <li><Link to="/budget" className="text-gray-300 hover:text-white transition-colors">Budget Tracker</Link></li>
              <li><Link to="/reminders" className="text-gray-300 hover:text-white transition-colors">Reminders</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300 mb-2">Have questions? We're here to help!</p>
            <Link 
              to="/contact" 
              className="inline-block px-6 py-2 bg-white text-primary-600 rounded-full font-semibold hover:bg-gray-100 transition-colors mt-2"
            >
              Get in Touch
            </Link>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} theWedding. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
          <div className="text-center mt-6 text-gray-400 text-sm flex items-center justify-center">
            Made with <FaHeart className="text-red-500 mx-1" /> for couples everywhere
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;