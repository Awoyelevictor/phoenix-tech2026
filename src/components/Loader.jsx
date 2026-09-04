import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loader after animation completes (e.g., 2.5 seconds)
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1.7, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-darkBg overflow-hidden"
    >
      <div className="relative flex items-center justify-center">
        {/* Animated text/logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-black tracking-tighter text-textPrimary relative z-10"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            dev
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 10 }}
            className="text-accent"
          >
            .
          </motion.span>
        </motion.div>

        {/* Circular sweep/pulse effect behind logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 2], opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute w-32 h-32 md:w-48 md:h-48 border border-accent rounded-full"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1.8], opacity: [0, 0.3, 0] }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="absolute w-32 h-32 md:w-48 md:h-48 border border-amber rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default Loader;
