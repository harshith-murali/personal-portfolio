'use client';

import { motion } from 'framer-motion';
import { skills } from '@/lib/data';
import MouseEffectCard from './MouseEffectCard';

export function Skills() {
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
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="skills"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-3 light:text-gray-900 transition-colors">
            <span className="text-accent-primary light:text-amber-700 transition-colors">Technical</span> Skills
          </h2>
          <p className="text-gray-400 light:text-gray-700 text-base sm:text-lg transition-colors">
            Tools, languages, and frameworks I build with
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skillGroup, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <MouseEffectCard
                title={skillGroup.category}
                skillsList={skillGroup.items}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Core Tech Stack Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <MouseEffectCard
            title="Core Architecture &amp; Specialization"
            subtitle="I specialize in modern full-stack engineering with a focus on Next.js (App Router), TypeScript, C++, and cloud architectures (AWS CCP certified)."
            skillsList={['Next.js', 'React.js', 'TypeScript', 'C++', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'AWS', 'Claude API']}
            className="w-full max-w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
