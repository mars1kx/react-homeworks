import React, { useState, ReactNode } from 'react';
import './Tooltip.css';

interface TooltipProps {
  children: ReactNode;
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleMouseEnter = (): void => {
    setIsVisible(true);
  }

  const handleMouseLeave = (): void => {
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
};

export default Tooltip; 