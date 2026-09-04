import { motion } from 'framer-motion';

/**
 * Animated icons inspired by animate-ui.com
 * Built with framer-motion SVG path animations
 * Each icon animates on hover using the AnimateIcon wrapper
 */

// ─── Wrapper: provides hover state to child icon ───────────────────────────
export const AnimateIcon = ({ children, className = '', size = 24 }) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      whileHover="hover"
      initial="normal"
      style={{ width: size, height: size }}
    >
      {children}
    </motion.div>
  );
};

// ─── Mail Icon ─────────────────────────────────────────────────────────────
export const AnimatedMail = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.rect
        x="2" y="4" width="20" height="16" rx="2"
        variants={{
          normal: { pathLength: 1, pathOffset: 0 },
          hover: {
            pathLength: [0, 1],
            pathOffset: [1, 0],
            transition: { duration: 0.5, ease: "easeInOut" }
          }
        }}
      />
      <motion.polyline
        points="2,4 12,13 22,4"
        fill="none"
        variants={{
          normal: { pathLength: 1, opacity: 1 },
          hover: {
            pathLength: [0, 1],
            opacity: [0, 1],
            transition: { duration: 0.4, delay: 0.2, ease: "easeOut" }
          }
        }}
      />
    </svg>
  );
};

// ─── Send / Paper Plane Icon ───────────────────────────────────────────────
export const AnimatedSend = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M22 2 11 13"
        variants={{
          normal: { pathLength: 1, pathOffset: 0 },
          hover: {
            pathLength: [0, 1],
            transition: { duration: 0.3, ease: "easeOut" }
          }
        }}
      />
      <motion.path
        d="M22 2 15 22 11 13 2 9z"
        fill="none"
        variants={{
          normal: { pathLength: 1, pathOffset: 0 },
          hover: {
            pathLength: [0, 1],
            pathOffset: [0.5, 0],
            transition: { duration: 0.5, ease: "easeInOut" }
          }
        }}
      />
    </svg>
  );
};

// ─── Arrow Right Icon ──────────────────────────────────────────────────────
export const AnimatedArrowRight = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.line
        x1="5" y1="12" x2="19" y2="12"
        variants={{
          normal: { x2: 19 },
          hover: { x2: [15, 19], transition: { duration: 0.3, ease: "easeOut" } }
        }}
      />
      <motion.polyline
        points="12 5 19 12 12 19"
        variants={{
          normal: { x: 0 },
          hover: { x: [4, 0], transition: { duration: 0.3, ease: "easeOut" } }
        }}
      />
    </svg>
  );
};

// ─── GitHub Icon ───────────────────────────────────────────────────────────
export const AnimatedGithub = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
        variants={{
          normal: { pathLength: 1, rotate: 0 },
          hover: {
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.5, ease: "easeInOut" }
          }
        }}
      />
      <motion.path
        d="M9 18c-4.51 2-5-2-7-2"
        variants={{
          normal: { pathLength: 1 },
          hover: {
            pathLength: [0, 1],
            transition: { duration: 0.3, delay: 0.2 }
          }
        }}
      />
    </svg>
  );
};

// ─── User / Person Icon ────────────────────────────────────────────────────
export const AnimatedUser = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.circle
        cx="12" cy="8" r="5"
        variants={{
          normal: { scale: 1 },
          hover: {
            scale: [1, 1.1, 1],
            transition: { duration: 0.4, ease: "easeInOut" }
          }
        }}
      />
      <motion.path
        d="M20 21a8 8 0 0 0-16 0"
        variants={{
          normal: { pathLength: 1, pathOffset: 0 },
          hover: {
            pathLength: [0, 1],
            pathOffset: [0.5, 0],
            transition: { duration: 0.4, ease: "easeOut" }
          }
        }}
      />
    </svg>
  );
};

// ─── Map Pin Icon ──────────────────────────────────────────────────────────
export const AnimatedMapPin = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
        variants={{
          normal: { y: 0 },
          hover: {
            y: [0, -3, 0],
            transition: { duration: 0.5, ease: "easeInOut" }
          }
        }}
      />
      <motion.circle
        cx="12" cy="10" r="3"
        variants={{
          normal: { scale: 1, y: 0 },
          hover: {
            scale: [1, 1.2, 1],
            y: [0, -3, 0],
            transition: { duration: 0.5, ease: "easeInOut" }
          }
        }}
      />
    </svg>
  );
};

// ─── Code Icon ─────────────────────────────────────────────────────────────
export const AnimatedCode = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.polyline
        points="16 18 22 12 16 6"
        variants={{
          normal: { x: 0 },
          hover: { x: [2, 0], transition: { duration: 0.3, ease: "easeOut" } }
        }}
      />
      <motion.polyline
        points="8 6 2 12 8 18"
        variants={{
          normal: { x: 0 },
          hover: { x: [-2, 0], transition: { duration: 0.3, ease: "easeOut" } }
        }}
      />
    </svg>
  );
};

// ─── External Link Icon ────────────────────────────────────────────────────
export const AnimatedExternalLink = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
        variants={{
          normal: { pathLength: 1 },
          hover: {
            pathLength: [0, 1],
            transition: { duration: 0.4, ease: "easeOut" }
          }
        }}
      />
      <motion.polyline
        points="15 3 21 3 21 9"
        variants={{
          normal: { pathLength: 1 },
          hover: {
            pathLength: [0, 1],
            transition: { duration: 0.3, delay: 0.1 }
          }
        }}
      />
      <motion.line
        x1="10" y1="14" x2="21" y2="3"
        variants={{
          normal: { pathLength: 1 },
          hover: {
            pathLength: [0, 1],
            transition: { duration: 0.3, delay: 0.2 }
          }
        }}
      />
    </svg>
  );
};

// ─── Sparkles Icon ─────────────────────────────────────────────────────────
export const AnimatedSparkles = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
        variants={{
          normal: { scale: 1, rotate: 0 },
          hover: {
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0],
            transition: { duration: 0.5, ease: "easeInOut" }
          }
        }}
      />
      <motion.path
        d="M20 3v4"
        variants={{
          normal: { opacity: 1, scale: 1 },
          hover: {
            opacity: [0, 1],
            scale: [0.5, 1],
            transition: { duration: 0.3, delay: 0.1 }
          }
        }}
      />
      <motion.path
        d="M22 5h-4"
        variants={{
          normal: { opacity: 1, scale: 1 },
          hover: {
            opacity: [0, 1],
            scale: [0.5, 1],
            transition: { duration: 0.3, delay: 0.2 }
          }
        }}
      />
    </svg>
  );
};
