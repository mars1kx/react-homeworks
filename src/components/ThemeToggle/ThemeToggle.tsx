import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import moonIcon from '../../assets/moon.svg';
import sunIcon from '../../assets/sun.svg';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <img src={moonIcon} alt="Dark theme" />
      ) : (
        <img src={sunIcon} alt="Light theme" />
      )}
    </button>
  );
};

export default ThemeToggle; 