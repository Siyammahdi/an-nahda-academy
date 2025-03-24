import React, { ReactNode } from 'react';

interface SuccessLayoutProps {
  children: ReactNode;
}

const SuccessLayout: React.FC<SuccessLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default SuccessLayout;
