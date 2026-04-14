'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-dark-950 flex items-center justify-center overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent-primary/0 via-accent-primary/20 to-accent-primary/0"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Loading content */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-6">
            <motion.div
              className="w-16 h-16 border-4 border-dark-700 border-t-accent-primary rounded-full flex-shrink-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />

            <motion.div
              className="text-accent-primary text-2xl font-bold whitespace-nowrap"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Welcome
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
