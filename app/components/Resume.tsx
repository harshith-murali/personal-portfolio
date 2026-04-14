'use client';

import { motion } from 'framer-motion';

export function Resume() {
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
      id="resume"
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
            My <span className="text-accent-primary">Resume</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Download my resume to learn more about my experience and qualifications
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="bg-dark-800 rounded-lg p-8 border border-dark-700 hover:border-accent-primary transition-colors w-full max-w-md text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-4xl">📄</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Download My Resume</h3>
            <p className="text-gray-400 mb-6">
              Get my comprehensive resume showcasing my skills, experience, projects, and achievements.
            </p>
            <motion.a
              href="/resume.pdf"
              download="Harshith_M_Resume.pdf"
              className="inline-flex items-center gap-2 px-8 py-3 bg-accent-primary text-dark-950 font-semibold rounded-lg hover:bg-accent-secondary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Download Resume</span>
              <span>↓</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
