import React, { useState, useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
    
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 100));
        return newProgress < 0 ? 0 : newProgress;
      });
    }, 100);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration, onClose]);
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };
  
  if (!visible) return null;
  
  return (
    <div className={`toast toast-${type} ${visible ? 'show' : ''}`}>
      <div className="toast-content">
        <span className="toast-icon">{getIcon()}</span>
        <p className="toast-message">{message}</p>
        <button className="toast-close" onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}>
          &times;
        </button>
      </div>
      <div className="toast-progress">
        <div 
          className="toast-progress-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Toast;
