import React, { ReactNode, PropsWithChildren } from 'react';
import './BackgroundWrapperHome.css';

const BackgroundWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="background-wrapper-home">{children}</div>;
};

export default BackgroundWrapper; 