import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import portfolioDataRaw from '../data/portfolio.json';
import { 
  AnimatedSparkles, 
  AnimatedCode,
  AnimatedPalette,
  AnimatedServer,
  AnimatedDatabase,
  AnimatedTools,
  AnimatedBot,
  AnimatedZap
} from './icons/AnimatedIcons';

const CATEGORY_META = {
  frontend: { title: 'Frontend Architecture', icon: <AnimatedPalette size={22} color="#06b6d4" />, color: 'from-cyan-500/20 to-blue-600/20', borderColor: 'border-cyan-500/30' },
  backend: { title: 'Backend & APIs', icon: <AnimatedServer size={22} color="#818cf8" />, color: 'from-indigo-500/20 to-purple-600/20', borderColor: 'border-indigo-500/30' },
  database: { title: 'Database & Storage', icon: <AnimatedDatabase size={22} color="#10b981" />, color: 'from-emerald-500/20 to-teal-600/20', borderColor: 'border-emerald-500/30' },
  tools: { title: 'Workflow & DevOps', icon: <AnimatedTools size={22} color="#f59e0b" />, color: 'from-amber-500/20 to-orange-600/20', borderColor: 'border-amber-500/30' },
  ai: { title: 'AI & Machine Learning', icon: <AnimatedBot size={22} color="#c084fc" />, color: 'from-purple-500/20 to-pink-600/20', borderColor: 'border-purple-500/30' },
};

const Skills = ({ 
  technologies = portfolioDataRaw.technologies, 
  specialization = portfolioDataRaw.specialization,
  experience = portfolioDataRaw.experience,
  careerGoals = portfolioDataRaw.careerGoals 
}) => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yOrb = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  if (!technologies) return null;

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-32 px-6 relative z-10 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Parallax Ambient Orbs */}
      <motion.div 
        style={{ y: yOrb }}
        className="absolute top-1/3 -left-32 w-96 h-96 bg-accent/15 rounded-full blur-[140px] pointer-events-none -z-10"
      />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Section divider */}
      <div className="section-divider mb-28" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
            <AnimatedCode size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-textPrimary tracking-tight">
            Skills & <span className="text-gradient-accent">Expertise</span>
          </h2>
        </div>
        <p className="text-textSecondary text-sm sm:text-base max-w-md font-normal leading-relaxed">
          Comprehensive stack spanning modern frontend user interfaces, high-performance backends, database design, and next-gen AI systems.
        </p>
      </motion.div>

      {/* Technologies Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {Object.entries(technologies || {}).map(([category, rawItems], catIdx) => {
          const items = Array.isArray(rawItems)
            ? rawItems
            : (typeof rawItems === 'string' ? rawItems.split(',').map(s => s.trim()).filter(Boolean) : []);

          const meta = CATEGORY_META[category] || { 
            title: category, 
            icon: <AnimatedCode size={22} color="#a1a1aa" />, 
            color: 'from-white/10 to-white/5', 
            borderColor: 'border-white/10' 
          };

          return (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: catIdx * 0.1, 
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: -6 }}
              className="bg-charcoal/70 rounded-3xl p-7 border border-white/[0.06] hover:border-white/20 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] group-hover:border-accent/40 group-hover:bg-accent/10 transition-all duration-300">
                    {meta.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-textPrimary text-base group-hover:text-accent transition-colors">
                      {meta.title}
                    </h3>
                    <p className="text-[11px] text-textMuted font-medium">
                      {items.length} technologies
                    </p>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2">
                  {items.map((tech, idx) => (
                    <motion.span 
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-accent/20 border border-white/[0.06] hover:border-accent/40 text-xs font-medium text-textSecondary hover:text-white transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Specialization & Experience Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Specializations Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="bg-charcoal/50 rounded-3xl p-8 border border-white/[0.06] backdrop-blur-sm"
        >
          <div className="flex items-center gap-2.5 mb-6">
            <span className="text-accent flex items-center justify-center">
              <AnimatedZap size={20} color="#818cf8" />
            </span>
            <h3 className="text-lg font-bold text-textPrimary tracking-tight">
              Core Specializations
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(Array.isArray(specialization)
              ? specialization
              : (typeof specialization === 'string' ? specialization.split(',').map(s => s.trim()).filter(Boolean) : [])
            ).map((spec, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-accent/30 hover:bg-white/[0.06] transition-all flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs sm:text-sm font-semibold text-textPrimary">
                  {spec}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Experience & Goals Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="bg-charcoal/50 rounded-3xl p-8 border border-white/[0.06] backdrop-blur-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <span className="text-purple-400 text-lg">🎯</span>
              <h3 className="text-lg font-bold text-textPrimary tracking-tight">
                Practical Focus & Intern Experience
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-textSecondary leading-relaxed mb-6 font-normal">
              {experience?.role ? `${experience.role}: ` : ''}
              Passionate about building full-stack products, responsive UI components, and integrating cutting-edge AI features.
            </p>
            <div className="flex flex-wrap gap-2">
              {(experience?.focus || careerGoals || []).slice(0, 5).map((item, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

