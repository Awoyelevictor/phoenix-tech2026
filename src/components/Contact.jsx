import { useState } from 'react';
import { motion } from 'framer-motion';
import { sendContactMessage } from '../utils/api';
import { 
  AnimateIcon, 
  AnimatedMail, 
  AnimatedSend, 
  AnimatedUser, 
  AnimatedMapPin 
} from './icons/AnimatedIcons';

const Contact = () => {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await sendContactMessage(formData);
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error('Contact Form Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 relative z-10 max-w-7xl mx-auto">
      {/* Starfield background (inspired by old portfolio) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Section divider */}
      <div className="section-divider mb-32" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-textPrimary tracking-tight mb-6">
            Get In Touch
          </h2>
          <p className="text-textSecondary leading-relaxed mb-12 font-light max-w-md">
            Have a project in mind or want to chat? Feel free to reach out!
          </p>

          {/* Contact details with animated icons */}
          <div className="space-y-6">
            <motion.a
              href="mailto:awoyeleeema1@gmail.com"
              className="flex items-center gap-4 group"
              whileHover="hover"
              initial="normal"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent transition-colors duration-500">
                <AnimateIcon size={20}>
                  <AnimatedMail size={20} />
                </AnimateIcon>
              </div>
              <div>
                <p className="text-sm font-medium text-textPrimary mb-1">Email</p>
                <p className="text-sm text-textSecondary">
                  awoyeleeema1@gmail.com
                </p>
              </div>
            </motion.a>

            <motion.div
              className="flex items-center gap-4 group"
              whileHover="hover"
              initial="normal"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 transition-colors duration-500">
                <AnimateIcon size={20}>
                  <AnimatedMapPin size={20} />
                </AnimateIcon>
              </div>
              <div>
                <p className="text-sm font-medium text-textPrimary mb-1">Location</p>
                <p className="text-sm text-textSecondary">Nigeria, Osogbo</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <form onSubmit={handleSubmit} className="space-y-6 bg-charcoal/60 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
            {/* Name field */}
            <div className="group">
              <label htmlFor="name" className="text-sm font-medium text-textSecondary mb-2 block">
                Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-darkBg border border-white/10 rounded-xl text-sm text-textPrimary focus:outline-none focus:border-accent transition-all duration-300"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="group">
              <label htmlFor="email" className="text-sm font-medium text-textSecondary mb-2 block">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-darkBg border border-white/10 rounded-xl text-sm text-textPrimary focus:outline-none focus:border-accent transition-all duration-300"
                />
              </div>
            </div>

            {/* Message field */}
            <div className="group">
              <label htmlFor="message" className="text-sm font-medium text-textSecondary mb-2 block">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-darkBg border border-white/10 rounded-xl text-sm text-textPrimary focus:outline-none focus:border-accent transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
              whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
              className={`
                w-full py-4 px-8 rounded-xl text-sm font-bold tracking-wide flex items-center justify-center gap-3
                transition-all duration-500 cursor-pointer
                ${status === 'sent' 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : status === 'error'
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-accent text-white hover:bg-accent/80'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {status === 'sending' && 'Sending...'}
              {status === 'idle' && 'Send Message'}
              {status === 'sent' && '✓ Sent!'}
              {status === 'error' && 'Failed to send'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
