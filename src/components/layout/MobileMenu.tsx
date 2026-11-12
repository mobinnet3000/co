import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import { headerNavItems } from '../../data/navigation';
import { Logo } from '../common/Logo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

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
            className="fixed top-0 right-0 bottom-0 w-[82%] max-w-sm bg-brand-sand z-50 shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden border-l border-brand-border"
          >
            {/* Header with Logo Motion */}
            <div className="p-4 sm:p-5 border-b border-brand-border flex items-center justify-between bg-white/60">
              <Logo asVideo size="sm" />
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-500 hover:text-navy-900 hover:bg-slate-100 focus:outline-none"
                aria-label="بستن منو"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Essential Navigation Links */}
            <nav className="p-5 flex-1">
              <ul className="space-y-2">
                {headerNavItems.map((item) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={onClose}
                        style={
                          isActive
                            ? { backgroundColor: 'transparent', borderColor: '#0f1821', color: '#0f1821' }
                            : { backgroundColor: 'rgba(15, 24, 33, 0.08)', borderColor: 'transparent', color: '#0f1821' }
                        }
                        className={`flex items-center justify-between py-2.5 px-4 rounded-[10px] text-sm border transition-all ${
                          isActive
                            ? 'font-bold shadow-xs'
                            : 'font-medium hover:bg-[#0f1821]/[0.13]'
                        }`}
                      >
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer Actions (ورود به سامانه + ارتباط با ما) */}
            <div className="p-5 border-t border-brand-border bg-white/60 space-y-2.5">
              <a
                href="https://madan.ba3tani.ir"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                style={{ backgroundColor: '#efa73f', color: '#0f1821' }}
                className="w-full py-2.5 px-4 rounded-[10px] font-bold text-sm text-center shadow-sm flex items-center justify-center hover:brightness-95 transition-all select-none border border-[#d48e28]/30"
              >
                ورود به سامانه (madan.ba3tani.ir)
              </a>
              <Link
                to="/contact"
                onClick={onClose}
                style={{ backgroundColor: 'transparent', borderColor: '#c92127', color: '#c92127' }}
                className="w-full py-2.5 px-4 rounded-[10px] font-semibold text-sm text-center border shadow-xs flex items-center justify-center gap-2 hover:bg-[#c92127]/10 transition-all select-none"
              >
                <span>ارتباط با ما</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="text-center text-[11px] text-slate-500 font-light pt-1">
                معدنکو • محاسبات عملیات داده ارزیابی نوین
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
