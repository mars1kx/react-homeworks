import React, { ReactNode, PropsWithChildren } from 'react';
import './BackgroundWrapperHome.css';
import { useTheme } from '../../contexts/ThemeContext';

const BackgroundWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`background-wrapper-home ${theme}`}>
      {children}
    </div>
  );
};

export default BackgroundWrapper; 