'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';
import { SocialIcon } from './SocialIcon';

export function Footer() {
  const currentYear = new Date().getFullYear();


  return (
    <footer className="bg-dark-900/50 light:bg-gray-50 backdrop-blur-sm border-t border-dark-700 light:border-gray-200 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-accent-primary light:text-amber-700 mb-2 transition-colors">HM</h3>
            <p className="text-gray-400 light:text-gray-600 transition-colors">{personalInfo.title}</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold light:text-gray-900 mb-4 transition-colors">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 light:text-gray-600 hover:text-accent-primary light:hover:text-amber-700 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold light:text-gray-900 mb-4 transition-colors">Connect</h4>
            <div className="flex gap-4">
              <SocialIcon platform="github" url={personalInfo.socials.github} />
              <SocialIcon platform="linkedin" url={personalInfo.socials.linkedin} />
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-700 light:border-gray-200 pt-8 transition-colors">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400 light:text-gray-600 transition-colors">
            <p className='justify-center items-center'>
              © {currentYear} Harshith M. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
