'use client';

import { motion } from 'framer-motion';

interface SocialIconProps {
  platform: 'github' | 'linkedin' | 'leetcode';
  url: string;
  className?: string;
}

export function SocialIcon({ platform, url, className = '' }: SocialIconProps) {
  const getIcon = () => {
    switch (platform) {
      case 'github':
        return (
          <svg
            className={`w-6 h-6 fill-current ${className}`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg
            className={`w-6 h-6 fill-current ${className}`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.25-.129.599-.129.948v5.419h-3.554s.047-8.733 0-9.633h3.554v1.364c.429-.663 1.196-1.608 2.905-1.608 2.121 0 3.71 1.385 3.71 4.363v5.514zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.708 0-.955.771-1.707 1.956-1.707 1.184 0 1.915.752 1.94 1.707 0 .95-.756 1.708-1.98 1.708zm1.946 11.597H3.392V9.819h3.891v10.633zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
          </svg>
        );
      case 'leetcode':
        return (
          <svg
            className={`w-6 h-6 fill-current ${className}`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.102 17.93h-3.595v-5.3h3.597V17.93zM16.9 5.95H7.627c-.892 0-1.62.727-1.62 1.623v7.185c0 .891.728 1.62 1.62 1.62h9.273c.892 0 1.62-.729 1.62-1.62V7.573c0-.896-.727-1.623-1.62-1.623zM11.2 13.22h-3.59v-5.3h3.59v5.3zM0 12a12 12 0 1024 0 12 12 0 00-24 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center p-2 rounded-lg text-accent-primary hover:text-accent-secondary hover:bg-dark-800 transition-colors"
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Visit our ${platform}`}
    >
      {getIcon()}
    </motion.a>
  );
}
