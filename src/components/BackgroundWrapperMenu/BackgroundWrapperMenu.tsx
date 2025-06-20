import React, { ReactNode } from 'react';
import './BackgroundWrapperMenu.css';
import { useTheme } from '../../contexts/ThemeContext';

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`background-wrapper-menu ${theme}`}>
      {children}
    </div>
  );
};

export default BackgroundWrapper; 