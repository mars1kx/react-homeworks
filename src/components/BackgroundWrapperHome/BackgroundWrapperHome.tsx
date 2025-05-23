import React, { ReactNode } from 'react';
import './BackgroundWrapperHome.css';

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  return <div className="background-wrapper-home">{children}</div>;
};

export default BackgroundWrapper; 