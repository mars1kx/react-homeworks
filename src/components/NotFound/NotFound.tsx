import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import './NotFound.css';

const NotFound: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`not-found-container ${theme}`}>
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for doesn't exist.</p>
        <Link to="/" className="back-home-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 