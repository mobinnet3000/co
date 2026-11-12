import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ArrowLeft } from 'lucide-react';
import { headerNavItems } from '../../data/navigation';
import { Logo } from '../common/Logo';
import { MobileMenu } from './MobileMenu';
import { useScrollPosition } from '../../hooks/useScrollPosition';

interface NavbarProps {
  forceDarkText?: boolean;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isScrolled = scrollY > 20;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-sand/95 backdrop-blur-md shadow-subtle border-b border-brand-border py-2.5 sm:py-3'
            : 'bg-brand-sand/85 backdrop-blur-sm border-b border-brand-border/60 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Right: Company Animated Logo Motion */}
            <div className="flex-shrink-0 flex items-center">
              <Logo asVideo size="md" />
            </div>

            {/* Center: Essential Minimal Navigation Tabs */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-2.5">
              {headerNavItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={
                      isActive
                        ? { backgroundColor: 'transparent', borderColor: '#0f1821', color: '#0f1821' }
                        : { backgroundColor: 'rgba(15, 24, 33, 0.08)', borderColor: 'transparent', color: '#0f1821' }
                    }
                    className={`px-3.5 py-2 text-xs sm:text-sm rounded-[10px] border transition-all duration-200 select-none ${
                      isActive
                        ? 'font-bold shadow-xs'
                        : 'font-medium hover:bg-[#0f1821]/[0.13]'
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Left: Action Boxes (سامانه تحلیل داده + درخواست مشاوره) & Mobile Trigger */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* ورود به سامانه زنده - Official Corporate Yellow (#efa73f) with Navy Text (#0f1821) */}
              <a
                href="https://madan.ba3tani.ir"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#efa73f', color: '#0f1821' }}
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[10px] text-xs sm:text-sm font-bold shadow-sm hover:brightness-95 active:scale-95 transition-all select-none border border-[#d48e28]/30"
              >
                <span>ورود به سامانه</span>
              </a>

              {/* ارتباط مستقیم با شرکت - Transparent bg with thin red stroke (#c92127) & red text */}
              <Link
                to="/contact"
                style={{ backgroundColor: 'transparent', borderColor: '#c92127', color: '#c92127' }}
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[10px] text-xs sm:text-sm font-semibold border shadow-xs hover:bg-[#c92127]/10 active:scale-95 transition-all select-none"
              >
                <span>ارتباط با ما</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>

              {/* Hamburger Button for Mobile */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-[#0f1821] hover:bg-white/60 transition-colors"
                aria-label="منوی سایت"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
