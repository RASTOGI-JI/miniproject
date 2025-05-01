import React from 'react';
import './Loading.css';

const Loading = ({ size = 'medium', color = 'primary', fullScreen = false, text = '' }) => {
  const sizeClass = `loading-${size}`;
  const colorClass = `loading-${color}`;
  const containerClass = fullScreen ? 'loading-fullscreen' : '';
  
  return (
    <div className={`loading-container ${containerClass}`}>
      <div className={`loading-spinner ${sizeClass} ${colorClass}`}>
        <div className="loading-circle"></div>
        <div className="loading-circle"></div>
        <div className="loading-circle"></div>
      </div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading;
