'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ThemeToggler() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }

    localStorage.setItem('theme', newTheme);
  };

  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 light:bg-amber-100 light:hover:bg-amber-200 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <svg className="w-5 h-5 text-accent-primary light:text-amber-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c-5.33 0-10 4.67-10 10s4.67 10 10 10 10-4.67 10-10S17.33 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-accent-primary light:text-amber-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v1m6.16 1.84l-.71.71M21 12h-1m-4.95 6.16l-.71.71M12 21v-1m-6.16-1.84l.71-.71M3 12h1m4.95-6.16l.71.71M12 7a5 5 0 100 10 5 5 0 000-10z" />
        </svg>
      )}
    </motion.button>
  );
}
