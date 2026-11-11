import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageContainerProps {
  children: React.ReactNode;
  forceDarkNavbarText?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  forceDarkNavbarText = false,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bgLight">
      <Navbar forceDarkText={forceDarkNavbarText} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
