'use client';

import { motion } from 'framer-motion';
import { skills } from '@/lib/data';

export function Skills() {
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
      id="skills"
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
            <span className="text-accent-primary light:text-amber-700 transition-colors">Technical</span> Skills
          </h2>
          <p className="text-gray-400 light:text-gray-700 text-lg transition-colors">Tools and technologies I work with</p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-8 bg-gradient-to-br from-dark-800 to-dark-900 light:from-gray-50 light:to-white rounded-xl border border-dark-700 light:border-gray-200 hover:border-accent-primary light:hover:border-amber-700 transition-colors group"
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 217, 255, 0.1)' }}
            >
              <h3 className="text-xl font-bold text-accent-primary light:text-amber-700 mb-6 group-hover:text-accent-secondary light:group-hover:text-amber-600 transition-colors">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1 bg-dark-700/50 light:bg-gray-200 text-gray-200 light:text-gray-900 rounded-full text-sm border border-dark-600 light:border-gray-300 hover:border-accent-primary light:hover:border-amber-700 transition-colors"
                    whileHover={{
                      backgroundColor: 'rgba(0, 217, 255, 0.1)',
                      color: '#00d9ff',
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Tech */}
        <motion.div
          className="mt-20 p-10 bg-gradient-to-r from-accent-primary/10 via-accent-secondary/10 to-accent-tertiary/10 light:from-amber-700/5 light:via-amber-600/5 light:to-amber-500/5 rounded-xl border border-accent-primary/30 light:border-amber-700/30 transition-colors"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4 text-accent-primary light:text-amber-700 transition-colors">
            Core Tech Stack
          </h3>
          <p className="text-gray-300 light:text-gray-700 mb-6 transition-colors">
            I specialize in modern full-stack development with a focus on Next.js, TypeScript, and cloud technologies. My experience spans from building scalable APIs to crafting responsive, animated user interfaces.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {['Next.js', 'React', 'TypeScript', 'MongoDB', 'AWS'].map((tech) => (
              <div
                key={tech}
                className="text-center p-3 bg-dark-800/50 light:bg-gray-100 rounded-lg hover:bg-dark-700 light:hover:bg-gray-200 transition-colors"
              >
                <p className="font-semibold text-accent-primary light:text-amber-700 transition-colors">{tech}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
