'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ];

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
            className="fixed inset-0 z-40 bg-dark-950/80 backdrop-blur-sm md:hidden"
          />

          {/* Menu */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-dark-900 border-r border-dark-700 md:hidden"
          >
            <div className="pt-20 px-6 space-y-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-gray-300 hover:text-accent-primary rounded-lg hover:bg-dark-800 transition-colors"
                  onClick={onClose}
                  whileHover={{ x: 5 }}
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                className="block w-full mt-8 px-4 py-2 bg-accent-primary text-dark-950 font-semibold rounded-lg text-center hover:bg-accent-secondary transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
              >
                Let's Talk
              </motion.a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
