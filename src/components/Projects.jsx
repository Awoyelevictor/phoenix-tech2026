import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import portfolioDataRaw from '../data/portfolio.json';
import { AnimateIcon, AnimatedGithub, AnimatedExternalLink, AnimatedSparkles } from './icons/AnimatedIcons';

// Gradient presets based on project theme
const GRADIENT_PALETTES = [
  { from: '#6366f1', to: '#a855f7', icon: '🧠', tag: 'AI & Full-Stack' },
  { from: '#3b82f6', to: '#06b6d4', icon: '🌐', tag: 'Web App' },
  { from: '#ec4899', to: '#8b5cf6', icon: '✨', tag: 'Interactive 3D' },
  { from: '#10b981', to: '#059669', icon: '🏥', tag: 'Healthcare' },
  { from: '#f59e0b', to: '#d97706', icon: '📦', tag: 'Inventory' },
  { from: '#8b5cf6', to: '#6366f1', icon: '⚡', tag: 'Full-Stack' },
  { from: '#06b6d4', to: '#3b82f6', icon: '🌦️', tag: 'API & Data' },
  { from: '#64748b', to: '#334155', icon: '💻', tag: 'Terminal UI' },
];

const Projects = ({ projects = portfolioDataRaw.projects, featuredProjects = portfolioDataRaw.featuredProjects }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef(null);

  // Parallax for section header & background elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yOrb = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  // Combine raw project data with rich UI metadata
  const enrichedProjects = (projects || portfolioDataRaw.projects).map((p, index) => {
    const palette = GRADIENT_PALETTES[index % GRADIENT_PALETTES.length];
    const isFeatured = (featuredProjects || []).includes(p.name);
    return {
      ...p,
      id: p.name.toLowerCase().replace(/\s+/g, '-'),
      palette,
      isFeatured,
    };
  });

  // Category filter
  const filterOptions = ['All', 'Featured', 'React & Web', 'AI & 3D'];

  const filteredProjects = enrichedProjects.filter((project) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Featured') return project.isFeatured;
    if (activeFilter === 'React & Web') {
      return project.technologies.some(t => ['React.js', 'React', 'HTML', 'CSS', 'JavaScript'].includes(t));
    }
    if (activeFilter === 'AI & 3D') {
      return project.technologies.some(t => ['AI', '3D', 'Terminal UI'].includes(t)) || project.name.includes('AI') || project.name.includes('3D');
    }
    return true;
  });

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-32 px-6 bg-darkBg relative z-10 overflow-hidden"
    >
      {/* Ambient Parallax Glow */}
      <motion.div 
        style={{ y: yOrb }}
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10"
      />
      <div className="absolute bottom-10 -left-20 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header with badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
            <AnimatedSparkles size={14} />
            <span>Curated Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-textPrimary tracking-tight mb-5">
            Featured <span className="text-gradient-accent">Work & Projects</span>
          </h2>
          <p className="text-textSecondary text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            A showcase of applications, interactive web tools, and AI-powered digital products I've engineered with clean architectures and responsive design.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  activeFilter === filter
                    ? 'text-white bg-accent shadow-md shadow-accent/30 scale-105'
                    : 'text-textSecondary bg-charcoal/80 hover:bg-charcoal hover:text-textPrimary border border-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="group bg-charcoal/70 rounded-3xl overflow-hidden border border-white/[0.07] hover:border-accent/40 shadow-xl hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 flex flex-col backdrop-blur-sm"
              >
                {/* Visual Header Banner */}
                <div 
                  className="h-48 flex items-center justify-center relative overflow-hidden transition-all duration-700"
                  style={{ 
                    background: `linear-gradient(135deg, ${project.palette.from}22, ${project.palette.to}44)` 
                  }}
                >
                  {/* Subtle Grid overlay */}
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
                      backgroundSize: '16px 16px'
                    }}
                  />

                  {/* Top Badge */}
                  {project.isFeatured && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-accent/80 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                      ★ Featured
                    </div>
                  )}

                  {/* Icon */}
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-20 h-20 rounded-2xl bg-white/[0.08] border border-white/20 backdrop-blur-xl flex items-center justify-center text-4xl shadow-2xl relative z-10"
                  >
                    {project.palette.icon}
                  </motion.div>
                </div>

                {/* Card Body */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-textPrimary mb-2.5 group-hover:text-accent transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-textSecondary text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] text-textMuted text-[11px] rounded-lg font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                      <a 
                        href={project.github}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-accent text-textPrimary hover:text-white border border-white/10 hover:border-accent text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-300"
                      >
                        <AnimateIcon size={16}>
                          <AnimatedGithub size={16} />
                        </AnimateIcon>
                        <span>GitHub Code</span>
                      </a>

                      {project.vercel && (
                        <a 
                          href={project.vercel}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-accent/15 hover:bg-accent text-accent hover:text-white border border-accent/30 text-xs font-semibold transition-all duration-300 flex items-center justify-center"
                          title="Live Demo"
                        >
                          <AnimatedExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

