'use client';

import { motion } from 'framer-motion';
import { achievements } from '@/lib/data';

export function Achievements() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="achievements"
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
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 light:text-gray-900">
            <span className="text-accent-primary light:text-amber-700">Achievements</span> &
            Recognition
          </h2>
          <p className="text-gray-400 light:text-gray-700 text-lg">Awards and milestones</p>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {achievements.map((achievement) => (
            <motion.a
              key={achievement.id}
              href={achievement.link || '#'}
              target={achievement.link ? '_blank' : undefined}
              rel={achievement.link ? 'noopener noreferrer' : undefined}
              variants={itemVariants}
              className="relative group"
              whileHover={{ y: -10 }}
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 light:from-amber-700/10 to-accent-secondary/10 light:to-amber-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

              {/* Card Content */}
              <div className="relative p-8 bg-gradient-to-br from-dark-800 light:from-gray-50 to-dark-900 light:to-white rounded-xl border border-dark-700 light:border-gray-200 group-hover:border-accent-primary/50 light:group-hover:border-amber-700/50 transition-all h-full flex flex-col justify-between overflow-hidden">
                {/* Icon */}
                <div className="text-5xl mb-4 inline-block transform group-hover:scale-125 transition-transform origin-top-left">
                  {achievement.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white light:text-gray-900 mb-2 group-hover:text-accent-primary light:group-hover:text-amber-700 transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-400 light:text-gray-700 text-sm mb-4 transition-colors">
                    {achievement.description}
                  </p>
                </div>

                {/* Date and Link */}
                <div className="flex items-center justify-between pt-4 border-t border-dark-700 light:border-gray-200 transition-colors">
                  {achievement.date && (
                    <span className="text-sm text-gray-500 light:text-gray-600 transition-colors">{achievement.date}</span>
                  )}
                  {achievement.link && (
                    <motion.div
                      className="text-accent-primary light:text-amber-700 font-semibold transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      Learn More →
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Additional Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Projects Built', value: '15+' },
            { label: 'Code Commits', value: '500+' },
            { label: 'Problems Solved', value: '200+' },
            { label: 'Years Learning', value: '2+' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-accent-primary light:text-amber-700 mb-2 transition-colors">
                {stat.value}
              </div>
              <p className="text-sm text-gray-400 light:text-gray-700 transition-colors">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
