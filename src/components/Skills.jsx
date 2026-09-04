import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Skills = ({ technologies, specialization }) => {
  if (!technologies) return null;

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  // Subtle 3D tilt for the whole section
  const rotateX = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const translateZ = useTransform(scrollYProgress, [0, 1], [-80, 0]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} className="py-32 px-6 relative z-10 max-w-7xl mx-auto">
      {/* Section divider */}
      <div className="section-divider mb-32" />

      <motion.div
        style={{
          rotateX,
          translateZ,
          opacity: sectionOpacity,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-right"
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-textMuted mb-3 block">
            Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-textPrimary tracking-tight">
            Skills & Expertise
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Specializations */}
          <div>
            <h3 className="text-xs font-medium text-textMuted uppercase tracking-[0.15em] mb-8">
              Specialization
            </h3>
            <div className="flex flex-col gap-3">
              {specialization?.map((spec, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20, rotateY: -5 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: idx * 0.08, 
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="group p-4 rounded-xl glass-card-hover"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-accent/40 group-hover:bg-accent transition-colors duration-500" />
                    <span className="text-sm text-textSecondary font-medium group-hover:text-textPrimary transition-colors duration-500">
                      {spec}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technologies Grid */}
          <div>
            <h3 className="text-xs font-medium text-textMuted uppercase tracking-[0.15em] mb-8">
              Tech Stack
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {Object.entries(technologies).map(([category, items], catIdx) => (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, y: 15, rotateX: 5 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: catIdx * 0.1, 
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="mb-2"
                >
                  <h4 className="text-[11px] text-amber/60 mb-4 capitalize font-semibold tracking-wider uppercase">
                    {category}
                  </h4>
                  <ul className="space-y-2.5">
                    {items.map((tech, idx) => (
                      <li key={idx} className="text-sm text-textMuted hover:text-textSecondary transition-colors duration-300">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
