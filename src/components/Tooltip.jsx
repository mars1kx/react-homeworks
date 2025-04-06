import { useState } from 'react';
import './Tooltip.css';

function Tooltip({ children, text }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
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