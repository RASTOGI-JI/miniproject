import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setIsProfileOpen(false); // Close profile dropdown if open
  };

  // Toggle profile dropdown
  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
    setIsOpen(false); // Close mobile menu if open
  };

  // Handle scroll for sticky navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get auth state from context
  const { isAuthenticated, user, logout } = useAuth();

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <nav className={`fixed w-full z-50 bg-white shadow-sm transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-800" onClick={() => setIsOpen(false)}>
            <span className="text-2xl">💍</span>
            <span>theWedding</span>
          </Link>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none">
              {isOpen ? (
                <i className="fas fa-times text-xl"></i>
              ) : (
                <i className="fas fa-bars text-xl"></i>
              )}
            </button>
          </div>

          <ul className={`${isOpen ? 'block' : 'hidden'} absolute top-16 left-0 w-full bg-white shadow-md md:shadow-none md:flex md:w-auto md:space-x-8 md:static md:bg-transparent p-4 md:p-0 z-50 transition-all duration-300`}>
            <li className="py-2 md:py-0">
              <Link to="/" onClick={toggleMenu} className="block text-gray-700 hover:text-primary-600 transition-colors duration-200" data-aos="fade-down" data-aos-delay="100">
                Home
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/about" onClick={toggleMenu} className="block text-gray-700 hover:text-primary-600 transition-colors duration-200" data-aos="fade-down" data-aos-delay="200">
                About
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/service" onClick={toggleMenu} className="block text-gray-700 hover:text-primary-600 transition-colors duration-200" data-aos="fade-down" data-aos-delay="300">
                Services
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/gallery" onClick={toggleMenu} className="block text-gray-700 hover:text-primary-600 transition-colors duration-200" data-aos="fade-down" data-aos-delay="400">
                Gallery
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/guestlist" onClick={toggleMenu} className="block text-gray-700 hover:text-primary-600 transition-colors duration-200" data-aos="fade-down" data-aos-delay="500">
                Guest List
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/budget" onClick={toggleMenu} className="block text-gray-700 hover:text-primary-600 transition-colors duration-200" data-aos="fade-down" data-aos-delay="600">
                Budget
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/reminders" onClick={toggleMenu} className="block text-gray-700 hover:text-primary-600 transition-colors duration-200" data-aos="fade-down" data-aos-delay="700">
                Reminders
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/contact" onClick={toggleMenu} className="block text-gray-700 hover:text-primary-600 transition-colors duration-200" data-aos="fade-down" data-aos-delay="800">
                Contact
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/pricing" onClick={toggleMenu} className="block text-gray-700 hover:text-primary-600 transition-colors duration-200" data-aos="fade-down" data-aos-delay="900">
                Pricing
              </Link>
            </li>
          </ul>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button onClick={toggleProfile} className="flex items-center text-gray-600 hover:text-gray-900">
                  <i className="fas fa-user-circle text-2xl"></i>
                </button>
                {isProfileOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <li>
                      <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Log Out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200" onClick={() => setIsOpen(false)}>
                  Log In
                </Link>
                <Link to="/signin" className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all duration-200 transform hover:-translate-y-0.5">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;