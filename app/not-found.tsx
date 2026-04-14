'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-dark-950 light:bg-gradient-to-br light:from-[#faf6f1] light:to-[#f5ede3] transition-colors duration-300">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-8xl font-bold text-accent-primary light:text-amber-700 mb-4 transition-colors"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          404
        </motion.div>

        <h1 className="text-4xl font-bold mb-4 light:text-gray-900 transition-colors">Page Not Found</h1>
        <p className="text-gray-400 light:text-gray-700 mb-8 transition-colors">
          Oops! The page you're looking for doesn't exist. Let's get you back on
          track.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-accent-primary light:bg-amber-700 text-dark-950 light:text-white font-semibold rounded-lg hover:bg-accent-secondary light:hover:bg-amber-800 transition-colors duration-300"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
