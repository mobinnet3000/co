import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ArrowLeft } from 'lucide-react';
import { navigationItems } from '../../data/navigation';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-brand-sand z-50 shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden border-l border-brand-border"
          >
            {/* Header */}
            <div className="p-5 border-b border-brand-border flex items-center justify-between bg-white/60">
              <Logo showText={true} size="sm" />
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-500 hover:text-navy-900 hover:bg-slate-100 focus:outline-none"
                aria-label="بستن منو"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-5 flex-1">
              <ul className="space-y-1">
                {navigationItems.map((item) => {
                  const hasChildren = item.children && item.children.length > 0;
                  const isExpanded = openDropdown === item.label;

                  return (
                    <li key={item.path} className="border-b border-brand-border/40 last:border-none">
                      {hasChildren ? (
                        <div>
                          <button
                            onClick={() => toggleDropdown(item.label)}
                            className="w-full py-3 px-3 rounded-lg flex items-center justify-between text-navy-900 font-medium text-sm hover:bg-white/60 transition-colors"
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-brand-amberDark' : ''
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="pr-4 pl-2 py-1 space-y-1 bg-white/50 rounded-lg overflow-hidden"
                              >
                                {item.children?.map((child) => (
                                  <li key={child.path}>
                                    <Link
                                      to={child.path}
                                      onClick={onClose}
                                      className="block py-2 px-3 text-xs text-slate-600 hover:text-navy-900 hover:bg-white rounded transition-colors"
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className="block py-3 px-3 rounded-lg text-navy-900 font-medium text-sm hover:bg-white/60 transition-colors"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer Action */}
            <div className="p-5 border-t border-brand-border bg-white/60 space-y-3">
              <Button
                to="/contact"
                onClick={onClose}
                variant="primary"
                size="md"
                className="w-full bg-navy-900 hover:bg-navy-800 text-white"
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                درخواست مشاوره
              </Button>
              <div className="text-center text-[11px] text-slate-500 font-light">
                معدنکو • پایش و بهینه‌سازی خطوط فرآوری مواد معدنی
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
