'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';
import TypewriterTitle from './TypewriterTitle';

const roleSequences = [
  { text: 'Full-Stack Developer', deleteAfter: true },
  { text: 'Problem Solver', deleteAfter: true },
  { text: 'Cloud Enthusiast', deleteAfter: true },
  { text: 'Open Source Contributor', deleteAfter: true },
];

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-accent-primary/10 rounded-full mix-blend-screen blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-accent-secondary/10 rounded-full mix-blend-screen blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-block mb-6">
            <span className="badge animate-pulse">
              ✨ Welcome to my portfolio
            </span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
        >
          <span className="bg-gradient-to-r from-accent-primary dark:via-white light:via-amber-700 to-accent-secondary dark:to-accent-secondary light:to-amber-600 bg-clip-text text-transparent">
            {personalInfo.name}
          </span>
        </motion.h1>

        {/* Dynamic Typewriter Role */}
        <motion.div variants={itemVariants} className="mb-4 min-h-[3.5rem] flex items-center justify-center">
          <TypewriterTitle
            sequences={roleSequences}
            typingSpeed={50}
            deleteSpeed={30}
            pauseBeforeDelete={1000}
            className="py-0"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-300 light:text-gray-700 max-w-3xl mx-auto mb-12 transition-colors"
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#projects"
            className="px-8 py-3 bg-accent-primary light:bg-amber-700 text-dark-950 light:text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="/resume.pdf"
            download="Harshith_M_Resume.pdf"
            className="px-8 py-3 border-2 border-accent-primary light:border-amber-700 text-accent-primary light:text-amber-700 font-semibold rounded-lg hover:bg-accent-primary/10 light:hover:bg-amber-700/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-16 h-16 rounded-full bg-accent-primary light:bg-amber-700 flex items-center justify-center transition-colors duration-300"
          >
            <svg
              className="w-6 h-6 text-dark-950 light:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
