import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen flex flex-col bg-brand-bgLight">
      {/* Precision Scroll Progress Indicator on Top Edge */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-l from-[#C92127] via-[#EFA73F] to-[#0F1821] origin-right z-50 pointer-events-none"
      />
      <Navbar forceDarkText={forceDarkNavbarText} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
