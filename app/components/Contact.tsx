'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';
import { SocialIcon } from './SocialIcon';

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });

      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section
      id="contact"
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
            Let's <span className="text-accent-primary">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg">
            I'm always open to new opportunities and collaborations
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <p className="text-gray-300 mb-8">
                Whether you have a question or just want to say hi, feel free to
                reach out. I'll try my best to get back to you!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <motion.div
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
              >
                <span className="text-2xl">📧</span>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-accent-primary font-semibold hover:text-accent-secondary transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
              >
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="text-accent-primary font-semibold hover:text-accent-secondary transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                whileHover={{ x: 10 }}
              >
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-accent-primary font-semibold">
                    {personalInfo.location}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-gray-400 text-sm mb-4">Follow me on</p>
              <div className="flex gap-4">
                <SocialIcon platform="github" url={personalInfo.socials.github} />
                <SocialIcon platform="linkedin" url={personalInfo.socials.linkedin} />
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name <span className="text-accent-primary">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={`w-full px-4 py-2 bg-dark-800 border rounded-lg focus:outline-none text-white placeholder-gray-500 transition-colors ${
                  errors.name
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-dark-700 focus:border-accent-primary'
                }`}
                placeholder="Your name"
              />
              {errors.name && (
                <p id="name-error" className="text-red-400 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email <span className="text-accent-primary">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full px-4 py-2 bg-dark-800 border rounded-lg focus:outline-none text-white placeholder-gray-500 transition-colors ${
                  errors.email
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-dark-700 focus:border-accent-primary'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p id="email-error" className="text-red-400 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message <span className="text-accent-primary">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={5}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`w-full px-4 py-2 bg-dark-800 border rounded-lg focus:outline-none text-white placeholder-gray-500 transition-colors resize-none ${
                  errors.message
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-dark-700 focus:border-accent-primary'
                }`}
                placeholder="Your message..."
              />
              {errors.message && (
                <p id="message-error" className="text-red-400 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-accent-primary text-dark-950 font-semibold rounded-lg hover:bg-accent-secondary disabled:opacity-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400"
              >
                ✓ Message sent successfully!
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400"
              >
                ✗ Something went wrong. Please try again.
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
