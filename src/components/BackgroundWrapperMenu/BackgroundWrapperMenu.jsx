import React from 'react';
import './BackgroundWrapperMenu.css';

const BackgroundWrapper = ({ children }) => {
  return <div className="background-wrapper-menu">{children}</div>;
};

export default BackgroundWrapper; 