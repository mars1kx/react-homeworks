import React, { useState } from 'react';
import './Tooltip.css';

const Tooltip = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  }

  const handleMouseLeave = () => {
    setIsVisible(false);
  }

  return (
    <span 
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <span className="tooltip-text">
          {text}
        </span>
      )}
    </span>
  );
}

export default Tooltip; 