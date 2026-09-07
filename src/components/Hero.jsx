import { motion, useScroll, useTransform } from 'framer-motion';
import profile from '../../public/profile.png';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-64">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/20 rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">

        {/* Left Side: Text */}
        <motion.div
          className="flex-1 text-center md:text-left"
          style={{ y: yBg }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-8xl font-black text-textPrimary tracking-tighter leading-[1.1] mb-4 md:mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi, I'm <br />
            <span className="text-accent">Victor Awoyele</span> <br />
            Web Developer
          </motion.h1>

          <motion.p
            className="text-base md:text-xl text-textSecondary font-light max-w-xl mx-auto md:mx-0 mb-6 md:mb-10 leading-relaxed"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I create beautiful, functional websites and applications with a focus on user experience and modern design principles.
          </motion.p>

          {/* Restored Buttons inside text container */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#projects" className="px-6 py-3 md:px-8 md:py-4 bg-accent text-white rounded-xl font-medium tracking-wide hover:bg-accent/90 transition-colors">
              View My Work
            </a>
            <a href="#contact" className="px-6 py-3 md:px-8 md:py-4 border border-white/20 text-textPrimary rounded-xl font-medium tracking-wide hover:bg-white/5 transition-colors">
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Profile Picture - Always visible, responsive layout, transparent border */}
        <motion.div
          className="flex-1 flex items-center justify-center relative mt-8 md:mt-0"
          style={{ y: yImg }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Animated glow behind the image */}
          <motion.div
            className="absolute w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-400 blur-2xl opacity-40"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Profile Image with Transparent Border */}
          <div className="relative z-10 w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-transparent shadow-2xl">
            <img
              src={profile}
              alt="Victor Awoyele"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image isn't saved yet
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback placeholder if image fails to load */}
            <div className="hidden absolute inset-0 bg-charcoal items-center justify-center text-textMuted text-sm text-center px-4">
              Save image to public/profile.png
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default Hero;
