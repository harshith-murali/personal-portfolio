'use client';

import { motion } from 'framer-motion';
import { about } from '@/lib/data';

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="about"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 light:text-gray-900 transition-colors">
            <span className="text-accent-primary light:text-amber-700 transition-colors">About</span> Me
          </h2>
          <p className="text-gray-400 light:text-gray-700 text-lg transition-colors">Get to know me better</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-3xl font-bold light:text-gray-900 transition-colors">{about.title}</h3>
            {about.description.split('\n\n').map((paragraph, idx) => (
              <p
                key={idx}
                className="text-gray-300 light:text-gray-700 leading-relaxed text-lg transition-colors"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Highlights */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4"
          >
            {about.highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                className="p-6 bg-gradient-to-br from-dark-800 to-dark-900 light:from-gray-50 light:to-white rounded-lg border border-dark-700 light:border-gray-200 hover:border-accent-primary light:hover:border-amber-700 transition-colors"
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 217, 255, 0.1)' }}
              >
                <div className="text-accent-primary light:text-amber-700 text-2xl mb-2 transition-colors">
                  {idx === 0 && '🚀'}
                  {idx === 1 && '⚡'}
                  {idx === 2 && '💾'}
                  {idx === 3 && '☁️'}
                  {idx === 4 && '🔌'}
                  {idx === 5 && '⚙️'}
                </div>
                <h4 className="font-semibold text-white light:text-gray-900 transition-colors">{highlight}</h4>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Projects', value: '15+' },
            { label: 'Experience', value: '4 Years' },
            { label: 'Certifications', value: '2' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl font-bold text-accent-primary light:text-amber-700 mb-2 transition-colors">
                {stat.value}
              </div>
              <p className="text-gray-400 light:text-gray-700 transition-colors">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
