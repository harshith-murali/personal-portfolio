'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './Loader';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-50 bg-dark-950/95 dark:bg-zinc-950/95 backdrop-blur-2xl flex items-center justify-center overflow-hidden"
        >
          <Loader
            title="Harshith's Portfolio"
            subtitle="Preparing an exceptional experience for you..."
            size="md"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
