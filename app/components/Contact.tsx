'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';

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

  const socialLinks = [
    { label: 'GitHub', url: personalInfo.socials.github, handle: 'harshith-murali' },
    { label: 'LinkedIn', url: personalInfo.socials.linkedin, handle: 'harshith-m-dev' },
    { label: 'Email', url: `mailto:${personalInfo.email}`, handle: personalInfo.email },
  ];

  return (
    <section
      id="contact"
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
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Let's <span className="text-accent-primary">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Whether it's a collaboration, opportunity, or just a friendly chat - my inbox is open!
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Side - Social Connections */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="space-y-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target={social.label === 'Email' ? undefined : '_blank'}
                  rel={social.label === 'Email' ? undefined : 'noopener noreferrer'}
                  className="flex items-center gap-4 p-4 bg-dark-800 rounded-lg border border-dark-700 hover:border-accent-primary/50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 flex items-center justify-center text-accent-primary">
                    {social.label === 'GitHub' && (
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    )}
                    {social.label === 'LinkedIn' && (
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.25-.129.599-.129.948v5.419h-3.554s.047-8.733 0-9.633h3.554v1.364c.429-.663 1.196-1.608 2.905-1.608 2.121 0 3.71 1.385 3.71 4.363v5.514zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.708 0-.955.771-1.707 1.956-1.707 1.184 0 1.915.752 1.94 1.707 0 .95-.756 1.708-1.98 1.708zm1.946 11.597H3.392V9.819h3.891v10.633zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                      </svg>
                    )}
                    {social.label === 'Email' && (
                      <span className="text-2xl">✉️</span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{social.label}</p>
                    <p className="text-gray-400 text-sm">{social.handle}</p>
                  </div>
                </motion.a>
              ))}
            </div>
            <p className="text-gray-500 text-sm text-center mt-8">
              No spam, no bots - just genuine connections
            </p>
          </motion.div>

          {/* Right Side - Contact Form */}
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
