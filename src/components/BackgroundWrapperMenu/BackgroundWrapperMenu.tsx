import React, { ReactNode } from 'react';
import './BackgroundWrapperMenu.css';

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  return <div className="background-wrapper-menu">{children}</div>;
};

export default BackgroundWrapper; 