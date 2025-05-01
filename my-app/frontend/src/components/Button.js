import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  icon = null,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = "inline-flex items-center justify-center font-semibold relative overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Variant classes
  const variantClasses = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md hover:shadow-lg hover:-translate-y-1 focus:ring-primary-500",
    secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-md hover:shadow-lg hover:-translate-y-1 focus:ring-secondary-500",
    'outline-primary': "bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-50 hover:-translate-y-1 focus:ring-primary-500",
    'outline-secondary': "bg-transparent border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-50 hover:-translate-y-1 focus:ring-secondary-500",
    text: "bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-300",
    success: "bg-green-500 text-white shadow-md hover:bg-green-600 hover:shadow-lg hover:-translate-y-1 focus:ring-green-500",
    error: "bg-red-500 text-white shadow-md hover:bg-red-600 hover:shadow-lg hover:-translate-y-1 focus:ring-red-500",
  };
  
  // Size classes
  const sizeClasses = {
    small: "py-2 px-4 text-sm rounded-md",
    medium: "py-3 px-6 text-base rounded-md",
    large: "py-4 px-8 text-lg rounded-lg",
  };
  
  // Width classes
  const widthClasses = fullWidth ? "w-full" : "";
  
  // Disabled classes
  const disabledClasses = (disabled || isLoading) ? "opacity-60 cursor-not-allowed transform-none shadow-none" : "";
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${disabledClasses} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="mr-2">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
      
      {icon && iconPosition === 'left' && !isLoading && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
      
      {/* Ripple effect */}
      <span className="absolute inset-0 overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
      </span>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline-primary', 'outline-secondary', 'text', 'success', 'error']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button;
