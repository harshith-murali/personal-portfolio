'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';

export function Projects() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
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
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Featured <span className="text-accent-primary">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg">Crafted with passion and precision</p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl overflow-hidden border border-dark-700 hover:border-accent-primary/50 transition-all"
              whileHover={{ y: -10 }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative p-8 h-full flex flex-col justify-between">
                {/* Content */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-accent-primary transition-colors">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="badge">Featured</span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-dark-700 text-accent-primary rounded-full border border-dark-600 group-hover:border-accent-primary/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats and Links */}
                <div className="flex justify-between items-center pt-6 border-t border-dark-700">
                  {project.stats && (
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>⭐ {project.stats.stars}</span>
                      <span>🍴 {project.stats.forks}</span>
                    </div>
                  )}
                  <div className="flex gap-4">
                    {project.link !== '#' && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-primary hover:text-accent-secondary transition-colors font-semibold"
                        whileHover={{ x: 5 }}
                      >
                        Live →
                      </motion.a>
                    )}
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-primary hover:text-accent-secondary transition-colors font-semibold"
                      whileHover={{ x: 5 }}
                    >
                      Code →
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <motion.h3
              className="text-2xl font-bold mb-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Other <span className="text-accent-secondary">Projects</span>
            </motion.h3>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {otherProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="p-6 bg-dark-800/50 rounded-lg border border-dark-700 hover:border-accent-secondary/50 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <h4 className="text-xl font-bold mb-2 text-white hover:text-accent-secondary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-dark-700 text-gray-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.link !== '#' && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-secondary hover:text-accent-primary text-sm font-semibold"
                      >
                        Live
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-secondary hover:text-accent-primary text-sm font-semibold"
                    >
                      GitHub
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
