import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef(null);

  // Parallax scroll binding for hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Multi-depth parallax layers
  const yText = useTransform(smoothProgress, [0, 1], [0, 80]);
  const yImage = useTransform(smoothProgress, [0, 1], [0, 50]);
  const yChip1 = useTransform(smoothProgress, [0, 1], [0, -70]);
  const yChip2 = useTransform(smoothProgress, [0, 1], [0, -110]);
  const yChip3 = useTransform(smoothProgress, [0, 1], [0, -40]);
  const yOrb1 = useTransform(smoothProgress, [0, 1], [0, -120]);
  const yOrb2 = useTransform(smoothProgress, [0, 1], [0, 100]);
  const opacityHero = useTransform(smoothProgress, [0, 0.85], [1, 0]);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-28 md:pt-36 pb-16 px-6"
    >
      {/* Background Parallax Orbs & Glow */}
      <motion.div 
        style={{ y: yOrb1 }}
        className="absolute -top-24 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[130px] pointer-events-none -z-10" 
      />
      <motion.div 
        style={{ y: yOrb2 }}
        className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none -z-10" 
      />
      <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-amber/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 pointer-events-none -z-20 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Hero Content Container */}
      <motion.div 
        style={{ opacity: opacityHero }}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16"
      >
        {/* Left: Text & Action */}
        <motion.div 
          style={{ y: yText }}
          className="flex-1 text-center lg:text-left"
        >
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wide text-textSecondary">
              Available for full-time & freelance projects
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-textPrimary mb-6"
          >
            Crafting Scalable <br className="hidden sm:inline" />
            <span className="text-gradient-accent">Web Experiences</span> <br />
            & AI Solutions
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-textSecondary font-normal max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
          >
            Hi, I'm <strong className="text-textPrimary font-semibold">Victor Awoyele</strong> — a Computer Science student and Full-Stack Web Developer specialized in React, modern JavaScript ecosystems, and intelligent AI integrations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <a
              href="#projects"
              className="px-7 py-3.5 bg-gradient-to-r from-accent to-purple-600 text-white rounded-xl text-sm font-semibold tracking-wide hover:shadow-lg hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 bg-white/[0.03] hover:bg-white/[0.08] text-textPrimary border border-white/10 rounded-xl text-sm font-semibold tracking-wide hover:border-white/20 transition-all duration-300"
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Quick Metrics / Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-white/[0.06] flex items-center justify-center lg:justify-start gap-8 sm:gap-12"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-textPrimary">10+</div>
              <div className="text-xs text-textMuted uppercase tracking-wider mt-0.5">Projects Built</div>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-textPrimary">Full-Stack</div>
              <div className="text-xs text-textMuted uppercase tracking-wider mt-0.5">Specialization</div>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-accent">100%</div>
              <div className="text-xs text-textMuted uppercase tracking-wider mt-0.5">Dedication</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Interactive Parallax Image & Floating Chips */}
        <motion.div 
          style={{ y: yImage }}
          className="flex-1 relative flex items-center justify-center w-full max-w-md lg:max-w-lg"
        >
          {/* Pulsing Backlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 to-purple-600/30 rounded-full blur-3xl scale-95 animate-pulse" />

          {/* Avatar Container with Glass Border */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl p-2 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden group"
          >
            <div className="w-full h-full rounded-2xl overflow-hidden bg-charcoal relative">
              <img
                src="/profile.png"
                alt="Victor Awoyele"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/vite.svg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darkBg/80 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          {/* Floating Parallax Chip 1: React & Next/Vite */}
          <motion.div
            style={{ y: yChip1 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute -left-4 top-12 sm:top-16 z-20 px-4 py-2.5 rounded-2xl glass-card border border-white/15 shadow-xl flex items-center gap-3 backdrop-blur-xl hover:scale-105 transition-transform"
          >
            <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">
              ⚛️
            </span>
            <div>
              <p className="text-xs font-semibold text-textPrimary">Frontend Core</p>
              <p className="text-[11px] text-textMuted">React & Tailwind CSS</p>
            </div>
          </motion.div>

          {/* Floating Parallax Chip 2: AI & LLM integration */}
          <motion.div
            style={{ y: yChip2 }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="absolute -right-4 top-1/2 z-20 px-4 py-2.5 rounded-2xl glass-card border border-white/15 shadow-xl flex items-center gap-3 backdrop-blur-xl hover:scale-105 transition-transform"
          >
            <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
              🤖
            </span>
            <div>
              <p className="text-xs font-semibold text-textPrimary">AI Powered</p>
              <p className="text-[11px] text-textMuted">Gemini & LLMs</p>
            </div>
          </motion.div>

          {/* Floating Parallax Chip 3: Backend & Databases */}
          <motion.div
            style={{ y: yChip3 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute left-6 -bottom-6 z-20 px-4 py-2.5 rounded-2xl glass-card border border-white/15 shadow-xl flex items-center gap-3 backdrop-blur-xl hover:scale-105 transition-transform"
          >
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              ⚡
            </span>
            <div>
              <p className="text-xs font-semibold text-textPrimary">Full-Stack</p>
              <p className="text-[11px] text-textMuted">Node.js & MongoDB</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[11px] tracking-widest uppercase text-textMuted font-medium">Scroll</span>
        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1"
        >
          <div className="w-1 h-1.5 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

