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
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 light:text-gray-900 transition-colors">
            Selected <span className="text-accent-primary light:text-amber-700 transition-colors">Projects</span>
          </h2>
          <p className="text-gray-400 light:text-gray-700 text-lg transition-colors">
            Full-stack, backend, cloud, and algorithmic systems I have designed and built.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group relative bg-gradient-to-br from-dark-800 to-dark-900 light:from-gray-50 light:to-white rounded-xl overflow-hidden border border-dark-700 light:border-gray-200 hover:border-accent-primary light:hover:border-amber-700 transition-all h-full ${
                index === 0 ? 'lg:col-span-2' : ''
              }`}
              whileHover={{ y: -10 }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 light:from-amber-700/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative p-8 h-full flex flex-col justify-between">
                {/* Content */}
                <div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white light:text-gray-900 group-hover:text-accent-primary light:group-hover:text-amber-700 transition-colors break-words">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="badge">Featured</span>
                    )}
                  </div>
                  <p className="text-gray-300 light:text-gray-700 mb-6 leading-relaxed transition-colors">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-dark-700 light:bg-gray-200 text-accent-primary light:text-amber-700 rounded-full border border-dark-600 light:border-gray-300 group-hover:border-accent-primary light:group-hover:border-amber-700 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats and Links */}
                <div className="flex justify-between items-center gap-4 pt-6 border-t border-dark-700 light:border-gray-200">
                  {project.stats && (
                    <div className="flex gap-4 text-sm text-gray-400 light:text-gray-600 transition-colors">
                      <span>⭐ {project.stats.stars}</span>
                      <span>🍴 {project.stats.forks}</span>
                    </div>
                  )}
                  <div className="flex gap-4 ml-auto">
                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} live`}
                        className="text-accent-primary light:text-amber-700 hover:text-accent-secondary light:hover:text-amber-600 transition-colors font-semibold rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 light:focus-visible:ring-amber-700 light:focus-visible:ring-offset-white"
                        whileHover={{ x: 5 }}
                      >
                        Live →
                      </motion.a>
                    )}
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code on GitHub`}
                      className="text-accent-primary light:text-amber-700 hover:text-accent-secondary light:hover:text-amber-600 transition-colors font-semibold rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 light:focus-visible:ring-amber-700 light:focus-visible:ring-offset-white"
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
              className="text-2xl font-bold mb-8 text-center light:text-gray-900 transition-colors"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Other <span className="text-accent-secondary light:text-amber-700 transition-colors">Projects</span>
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
                  className="p-6 bg-dark-800/50 light:bg-gray-50 rounded-lg border border-dark-700 light:border-gray-200 hover:border-accent-secondary light:hover:border-amber-700 transition-colors h-full flex flex-col"
                  whileHover={{ y: -5 }}
                >
                  <h4 className="text-xl font-bold mb-2 text-white light:text-gray-900 hover:text-accent-secondary light:hover:text-amber-700 transition-colors break-words">
                    {project.title}
                  </h4>
                  <p className="text-gray-400 light:text-gray-700 text-sm mb-4 transition-colors leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-dark-700 light:bg-gray-200 text-gray-300 light:text-gray-900 rounded transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-auto pt-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} live`}
                        className="text-accent-secondary hover:text-accent-primary text-sm font-semibold rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 light:focus-visible:ring-amber-700 light:focus-visible:ring-offset-white"
                      >
                        Live →
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code on GitHub`}
                      className="text-accent-secondary hover:text-accent-primary text-sm font-semibold rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 light:focus-visible:ring-amber-700 light:focus-visible:ring-offset-white"
                    >
                      Code →
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
