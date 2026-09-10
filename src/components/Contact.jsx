import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sendContactMessage } from '../utils/api';
import portfolioDataRaw from '../data/portfolio.json';
import { 
  AnimateIcon, 
  AnimatedMail, 
  AnimatedSend, 
  AnimatedMapPin,
  AnimatedGithub,
  AnimatedSparkles
} from './icons/AnimatedIcons';

const Contact = ({ socials = portfolioDataRaw.socials }) => {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yOrb = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('awoyeleemma1@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyPhone = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('+2347017304536');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Create inquiry record
    const newInquiry = {
      _id: 'inq_' + Date.now(),
      name: formData.name,
      email: formData.email,
      message: formData.message,
      createdAt: new Date().toISOString(),
      read: false
    };

    // 1. Immediately save to localStorage so it appears in Admin Page right away
    try {
      const existing = JSON.parse(localStorage.getItem('portfolio_inquiries') || '[]');
      localStorage.setItem('portfolio_inquiries', JSON.stringify([newInquiry, ...existing]));
    } catch (err) {
      console.debug('Failed saving inquiry locally:', err);
    }

    try {
      // 2. Also send to MongoDB backend & trigger email notification
      await sendContactMessage(formData);
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.warn('Backend contact endpoint not active, saved to local inquiries:', error);
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-32 px-6 relative z-10 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Parallax Orbs */}
      <motion.div 
        style={{ y: yOrb }}
        className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10"
      />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Section divider */}
      <div className="section-divider mb-28" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left: Info (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
            <AnimatedSparkles size={14} />
            <span>Connect & Collaborate</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-textPrimary tracking-tight mb-6">
            Let's Build <br />
            <span className="text-gradient-accent">Something Great</span>
          </h2>
          
          <p className="text-textSecondary text-base leading-relaxed mb-10 font-normal">
            Whether you have a specific project in mind, want to discuss software engineering, or explore potential opportunities, my inbox is always open.
          </p>

          {/* Contact Cards */}
          <div className="space-y-4 mb-8">
            {/* Email Card with Copy Tooltip */}
            <div className="p-4 rounded-2xl bg-charcoal/60 border border-white/[0.06] hover:border-accent/40 transition-all flex items-center justify-between group">
              <a 
                href="mailto:awoyeleeema1@gmail.com"
                className="flex items-center gap-3.5 flex-1 min-w-0"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300 shrink-0">
                  <AnimatedMail size={20} />
                </div>
                <div className="truncate">
                  <p className="text-xs text-textMuted uppercase tracking-wider font-semibold">Email Address</p>
                  <p className="text-sm font-semibold text-textPrimary truncate group-hover:text-accent transition-colors">
                    awoyeleeema1@gmail.com
                  </p>
                </div>
              </a>
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-textSecondary hover:text-white text-xs font-medium transition-colors shrink-0 ml-2"
                title="Copy Email"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>

            {/* WhatsApp Card */}
            <a 
              href="https://wa.me/2347017304536?text=Hi%20Victor,%20I%20saw%20your%20portfolio!"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-charcoal/60 border border-white/[0.06] hover:border-[#25D366]/50 hover:bg-[#25D366]/5 transition-all flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300 shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="truncate">
                  <p className="text-xs text-textMuted uppercase tracking-wider font-semibold">WhatsApp Chat</p>
                  <p className="text-sm font-semibold text-textPrimary group-hover:text-[#25D366] transition-colors truncate">
                    +234 701 730 4536
                  </p>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] text-xs font-semibold group-hover:bg-[#25D366] group-hover:text-white transition-colors shrink-0 ml-2">
                Chat →
              </span>
            </a>

            {/* Phone Card */}
            <div className="p-4 rounded-2xl bg-charcoal/60 border border-white/[0.06] hover:border-accent/40 transition-all flex items-center justify-between group">
              <a 
                href="tel:+2347017304536"
                className="flex items-center gap-3.5 flex-1 min-w-0"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300 shrink-0">
                  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div className="truncate">
                  <p className="text-xs text-textMuted uppercase tracking-wider font-semibold">Phone Number</p>
                  <p className="text-sm font-semibold text-textPrimary truncate group-hover:text-accent transition-colors">
                    +234 701 730 4536
                  </p>
                </div>
              </a>
              <button
                onClick={handleCopyPhone}
                className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-textSecondary hover:text-white text-xs font-medium transition-colors shrink-0 ml-2"
                title="Copy Phone Number"
              >
                {copiedPhone ? '✓ Copied' : 'Copy'}
              </button>
            </div>

            {/* Location Card */}
            <div className="p-4 rounded-2xl bg-charcoal/60 border border-white/[0.06] flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                <AnimatedMapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-textMuted uppercase tracking-wider font-semibold">Location</p>
                <p className="text-sm font-semibold text-textPrimary">Nigeria, Osogbo & Remote</p>
              </div>
            </div>

            {/* Socials / GitHub */}
            {socials?.github && (
              <a 
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-charcoal/60 border border-white/[0.06] hover:border-purple-500/40 transition-all flex items-center gap-3.5 group block"
              >
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300 shrink-0">
                  <AnimatedGithub size={20} />
                </div>
                <div>
                  <p className="text-xs text-textMuted uppercase tracking-wider font-semibold">GitHub Profile</p>
                  <p className="text-sm font-semibold text-textPrimary group-hover:text-purple-400 transition-colors">
                    github.com/Awoyelevictor
                  </p>
                </div>
              </a>
            )}
          </div>
        </motion.div>

        {/* Right: Contact Form (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 lg:mt-28 mt-8"
        >
          <div className="bg-charcoal/70 p-8 sm:p-10 rounded-3xl border border-white/[0.08] backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Top subtle highlight */}
            <div className="absolute -top-24 right-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-2xl font-bold text-textPrimary mb-2">Send a Message</h3>
            <p className="text-textSecondary text-xs sm:text-sm mb-8 font-normal">
              Fill out the form below and I'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2 block">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-darkBg/90 border border-white/10 rounded-2xl text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2 block">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-darkBg/90 border border-white/10 rounded-2xl text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2 block">
                  Project Details or Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project, timeline, or idea..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3.5 bg-darkBg/90 border border-white/10 rounded-2xl text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={status !== 'sending' ? { scale: 1.01 } : {}}
                whileTap={status !== 'sending' ? { scale: 0.99 } : {}}
                className={`
                  w-full py-4 px-8 rounded-2xl text-sm font-bold tracking-wide flex items-center justify-center gap-3
                  transition-all duration-300 cursor-pointer shadow-lg
                  ${status === 'sent' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : status === 'error'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-gradient-to-r from-accent to-purple-600 text-white hover:shadow-accent/25 hover:shadow-xl'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {status === 'sending' && (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending Message...
                  </span>
                )}
                {status === 'idle' && (
                  <span className="inline-flex items-center gap-2">
                    <AnimateIcon size={18}>
                      <AnimatedSend size={18} />
                    </AnimateIcon>
                    Send Message
                  </span>
                )}
                {status === 'sent' && '✓ Message Received! Thank You.'}
                {status === 'error' && 'Failed to send. Please email directly.'}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Footer Copyright */}
      <div className="mt-28 pt-8 border-t border-white/[0.06] text-center text-xs text-textMuted flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Victor Awoyele. Built with React & Framer Motion.</p>
        <div className="flex items-center gap-6">
          <a href="#home" className="hover:text-textPrimary transition-colors">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;

