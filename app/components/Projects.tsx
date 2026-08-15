'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import ProjectCardFlip from './CardFlip';

export function Projects() {
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

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 light:text-gray-900 transition-colors">
            Selected <span className="text-accent-primary light:text-amber-700 transition-colors">Projects</span>
          </h2>
          <p className="text-gray-400 light:text-gray-700 text-lg transition-colors">
            Full-stack, backend, cloud, and algorithmic systems I have designed and built.
          </p>
        </motion.div>

        {/* Featured Projects Grid with 3D CardFlip */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants} className="w-full flex justify-center">
              <ProjectCardFlip project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <motion.h3
              className="text-2xl font-bold mb-8 text-center light:text-gray-900 transition-colors"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Other <span className="text-accent-secondary light:text-amber-700 transition-colors">Projects</span>
            </motion.h3>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {otherProjects.map((project) => (
                <motion.div key={project.id} variants={itemVariants} className="w-full flex justify-center">
                  <ProjectCardFlip project={project} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
