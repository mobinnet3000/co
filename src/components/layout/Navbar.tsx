import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, ArrowLeft } from 'lucide-react';
import { navigationItems } from '../../data/navigation';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { MobileMenu } from './MobileMenu';
import { useScrollPosition } from '../../hooks/useScrollPosition';

interface NavbarProps {
  forceDarkText?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ forceDarkText = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const scrollY = useScrollPosition();
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isScrolled = scrollY > 20;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-sand/95 backdrop-blur-md shadow-subtle border-b border-brand-border py-3'
            : 'bg-brand-sand/80 backdrop-blur-sm border-b border-brand-border/60 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Right: Company Logo */}
            <div className="flex-shrink-0">
              <Logo variant="dark" size="md" />
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navigationItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.children && item.children.some((c) => location.pathname === c.path));
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <div
                    key={item.path}
                    className="relative"
                    onMouseEnter={() => hasChildren && setActiveDropdown(item.label)}
                    onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                  >
                    {hasChildren ? (
                      <button
                        type="button"
                        className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                          isActive
                            ? 'text-navy-950 font-bold bg-white/80 shadow-xs'
                            : 'text-slate-700 hover:text-navy-950 hover:bg-white/50'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 inline-block ${
                          isActive
                            ? 'text-navy-950 font-bold bg-white/80 shadow-xs'
                            : 'text-slate-700 hover:text-navy-950 hover:bg-white/50'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* Minimalist Dropdown Menu */}
                    {hasChildren && activeDropdown === item.label && (
                      <div className="absolute top-full right-0 mt-1.5 w-72 bg-white rounded-xl shadow-elevated border border-brand-border py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        {item.children?.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2.5 text-right hover:bg-brand-sand transition-colors group"
                          >
                            <div className="text-sm font-medium text-navy-900 group-hover:text-brand-amberDark transition-colors">
                              {child.label}
                            </div>
                            {child.description && (
                              <div className="text-xs text-slate-500 mt-0.5 leading-snug line-clamp-1 font-light">
                                {child.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Left: Primary CTA Button & Mobile Trigger */}
            <div className="flex items-center gap-3">
              <Button
                to="/contact"
                variant="copper"
                size="sm"
                className="hidden sm:inline-flex bg-navy-900 hover:bg-navy-800 text-white font-medium border-none shadow-sm"
                icon={<ArrowLeft className="w-3.5 h-3.5" />}
              >
                درخواست مشاوره
              </Button>

              {/* Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-navy-900 hover:bg-white/60 transition-colors"
                aria-label="منوی سایت"
              >
                <Menu className="w-6 h-6" />
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
