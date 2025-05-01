import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Loading from '../components/Loading';
import { motion } from 'framer-motion';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // Initialize AOS for animations
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 1000, once: true });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  // Get toast functions
  const { success, error: showError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      // Prepare data for API
      const userData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      };

      console.log('Attempting to register user:', userData.email);

      // Call register API
      const response = await register(userData);
      console.log('Registration API response:', response);

      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }

      // Use auth context to login
      login(response.data.user, response.data.token);

      setSubmitted(true);
      setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });

      // Show success toast
      success('Account created successfully! Redirecting to dashboard...');

      // Redirect to home page after successful registration
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);

      // Provide more specific error messages based on the error
      let errorMessage = 'Registration failed. Please try again.';

      if (error.message.includes('Network error')) {
        errorMessage = 'Cannot connect to the server. Please check your internet connection and make sure the server is running.';
      } else if (error.message.includes('User already exists')) {
        errorMessage = 'This email is already registered. Please use a different email or try logging in.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setApiError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') setShowPassword((prev) => !prev);
    else setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <motion.div 
        className="max-w-md w-full bg-white rounded-xl shadow-soft p-8 sm:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8" data-aos="fade-down">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 font-serif">Create Your Account</h1>
          <p className="text-gray-600">Start planning your dream wedding with us today.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} data-aos="fade-up">
          <div>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.fullName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-primary-500'
                } focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-primary-500'
                } focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-primary-500'
                } focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('password')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-primary-500'
                } focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loading size="small" color="white" />
                  <span>Signing Up...</span>
                </div>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-green-50 text-green-700 text-center"
            >
              Account created successfully!
            </motion.div>
          )}

          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-red-50 text-red-700 text-center"
            >
              {apiError}
            </motion.div>
          )}
        </form>

        <div className="mt-6 text-center" data-aos="fade-up" data-aos-delay="100">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700 transition-colors">
              Log In
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500" data-aos="fade-up" data-aos-delay="200">
          By signing up, you agree to our{' '}
          <Link to="/terms" className="text-primary-600 hover:text-primary-700 transition-colors">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-primary-600 hover:text-primary-700 transition-colors">
            Privacy Policy
          </Link>
          .
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;