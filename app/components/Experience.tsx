'use client';

import { motion } from 'framer-motion';
import { experience } from '@/lib/data';

export function Experience() {
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="experience"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Experience & <span className="text-accent-primary">Education</span>
          </h2>
          <p className="text-gray-400 text-lg">My journey so far</p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="space-y-12 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-tertiary sm:left-1/2 sm:transform sm:-translate-x-1/2" />

          {experience.map((item, idx) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`relative pl-12 sm:pl-0 ${
                idx % 2 === 0 ? 'sm:pr-1/2 sm:text-right' : 'sm:ml-1/2 sm:pl-12'
              }`}
            >
              {/* Timeline Dot */}
              <motion.div
                className="absolute left-0 top-0 w-6 h-6 bg-accent-primary rounded-full border-4 border-dark-950 sm:left-1/2 sm:transform sm:-translate-x-1/2"
                whileHover={{ scale: 1.2 }}
              />

              {/* Content */}
              <motion.div
                className="p-6 bg-gradient-to-br from-dark-800 to-dark-900 rounded-lg border border-dark-700 hover:border-accent-primary/50 transition-colors"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">
                    {item.type === 'education' && '🎓'}
                    {item.type === 'work' && '💼'}
                    {item.type === 'achievement' && '🏆'}
                  </span>
                  <h3 className="text-xl font-bold text-accent-primary">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-400 font-semibold">{item.company}</p>
                <p className="text-sm text-gray-500 mb-4">{item.duration}</p>

                <ul className="space-y-2">
                  {item.description.map((desc, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-accent-secondary mt-1">▸</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
