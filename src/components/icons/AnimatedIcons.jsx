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

// ─── Chart / Analytics Icon ────────────────────────────────────────────────
export const AnimatedChart = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.line x1="18" y1="20" x2="18" y2="10" variants={{ hover: { y2: [10, 6, 10], transition: { duration: 0.5 } } }} />
    <motion.line x1="12" y1="20" x2="12" y2="4" variants={{ hover: { y2: [4, 8, 4], transition: { duration: 0.5, delay: 0.1 } } }} />
    <motion.line x1="6" y1="20" x2="6" y2="14" variants={{ hover: { y2: [14, 11, 14], transition: { duration: 0.5, delay: 0.2 } } }} />
  </svg>
);

// ─── Edit / Pen Icon ───────────────────────────────────────────────────────
export const AnimatedEdit = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
      variants={{
        hover: {
          rotate: [0, -8, 8, 0],
          originX: '2px',
          originY: '22px',
          transition: { duration: 0.5 }
        }
      }}
    />
  </svg>
);

// ─── Rocket Icon ───────────────────────────────────────────────────────────
export const AnimatedRocket = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
      variants={{
        hover: {
          x: [0, 3, 0],
          y: [0, -3, 0],
          transition: { duration: 0.5, ease: "easeInOut" }
        }
      }}
    />
    <motion.path d="m9 9 3 3" />
    <motion.path d="M5 21a10.6 10.6 0 0 1-.5-2.5" variants={{ hover: { opacity: [0, 1, 0], transition: { duration: 0.4, repeat: 1 } } }} />
  </svg>
);

// ─── Inbox / Messages Icon ─────────────────────────────────────────────────
export const AnimatedInbox = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <motion.path
      d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
      variants={{
        hover: {
          scale: [1, 1.05, 1],
          transition: { duration: 0.4 }
        }
      }}
    />
  </svg>
);

// ─── Eye Icon ──────────────────────────────────────────────────────────────
export const AnimatedEye = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
      variants={{
        hover: {
          scaleY: [1, 0.2, 1],
          transition: { duration: 0.35 }
        }
      }}
    />
    <motion.circle
      cx="12" cy="12" r="3"
      variants={{
        hover: {
          scale: [1, 1.3, 1],
          transition: { duration: 0.4, delay: 0.1 }
        }
      }}
    />
  </svg>
);

// ─── Trending / Growth Icon ────────────────────────────────────────────────
export const AnimatedTrending = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.polyline
      points="23 6 13.5 15.5 8.5 10.5 1 18"
      variants={{
        hover: {
          pathLength: [0, 1],
          transition: { duration: 0.5, ease: "easeOut" }
        }
      }}
    />
    <motion.polyline
      points="17 6 23 6 23 12"
      variants={{
        hover: {
          x: [0, 2, 0],
          y: [0, -2, 0],
          transition: { duration: 0.4 }
        }
      }}
    />
  </svg>
);

// ─── Laptop / Monitor Icon ─────────────────────────────────────────────────
export const AnimatedLaptop = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.rect
      x="3" y="4" width="18" height="12" rx="2"
      variants={{
        hover: {
          scale: [1, 1.05, 1],
          transition: { duration: 0.4 }
        }
      }}
    />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);

// ─── Save / Checkpoint Icon ────────────────────────────────────────────────
export const AnimatedSave = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
      variants={{
        hover: {
          scale: [1, 1.06, 1],
          transition: { duration: 0.4 }
        }
      }}
    />
    <motion.polyline points="17 21 17 13 7 13 7 21" />
    <motion.polyline points="7 3 7 8 15 8" />
  </svg>
);

// ─── Trash / Delete Icon ───────────────────────────────────────────────────
export const AnimatedTrash = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M3 6h18"
      variants={{
        hover: {
          y: -2,
          transition: { duration: 0.2 }
        }
      }}
    />
    <motion.path
      d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      variants={{
        hover: {
          y: -3,
          rotate: -6,
          transition: { duration: 0.25 }
        }
      }}
    />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

// ─── Plus / Add Icon ───────────────────────────────────────────────────────
export const AnimatedPlus = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <motion.line
      x1="12" y1="5" x2="12" y2="19"
      variants={{
        hover: {
          rotate: 90,
          transition: { duration: 0.3 }
        }
      }}
    />
    <motion.line
      x1="5" y1="12" x2="19" y2="12"
      variants={{
        hover: {
          rotate: 90,
          transition: { duration: 0.3 }
        }
      }}
    />
  </svg>
);

// ─── Upload / Arrow Up Tray Icon ───────────────────────────────────────────
export const AnimatedUpload = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <motion.polyline
      points="17 8 12 3 7 8"
      variants={{
        hover: {
          y: [-2, -5, -2],
          transition: { duration: 0.5, repeat: Infinity }
        }
      }}
    />
    <motion.line
      x1="12" y1="3" x2="12" y2="15"
      variants={{
        hover: {
          y1: [-2, -5, -2],
          y2: [-2, -5, -2],
          transition: { duration: 0.5, repeat: Infinity }
        }
      }}
    />
  </svg>
);

// ─── Image / Picture Icon ──────────────────────────────────────────────────
export const AnimatedImage = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <motion.circle
      cx="8.5" cy="8.5" r="1.5"
      variants={{
        hover: {
          scale: [1, 1.3, 1],
          transition: { duration: 0.4 }
        }
      }}
    />
    <motion.polyline
      points="21 15 16 10 5 21"
      variants={{
        hover: {
          pathLength: [0.8, 1],
          transition: { duration: 0.4 }
        }
      }}
    />
  </svg>
);

// ─── Palette / Frontend Icon ───────────────────────────────────────────────
export const AnimatedPalette = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M12 2C6.5 2 2 6.5 2 12c0 3.6 2 6.6 5 8 1 .5 2-.1 2-1.2 0-.6.2-1.1.7-1.4.6-.4 1.4-.4 2.1-.1.7.3 1.5.7 2.2.7 4.4 0 8-3.6 8-8 0-4.4-4.5-8-10-8z"
      variants={{
        hover: {
          rotate: [0, -10, 10, 0],
          transition: { duration: 0.6 }
        }
      }}
    />
    <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
    <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
    <circle cx="16.5" cy="10.5" r="1.5" fill="currentColor" />
  </svg>
);

// ─── Server / Backend Icon ─────────────────────────────────────────────────
export const AnimatedServer = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.rect
      x="2" y="2" width="20" height="8" rx="2" ry="2"
      variants={{ hover: { scale: [1, 1.04, 1], transition: { duration: 0.4 } } }}
    />
    <motion.rect
      x="2" y="14" width="20" height="8" rx="2" ry="2"
      variants={{ hover: { scale: [1, 1.04, 1], transition: { duration: 0.4, delay: 0.1 } } }}
    />
    <motion.line x1="6" y1="6" x2="6.01" y2="6" variants={{ hover: { opacity: [1, 0, 1], transition: { duration: 0.3, repeat: 2 } } }} />
    <motion.line x1="6" y1="18" x2="6.01" y2="18" variants={{ hover: { opacity: [1, 0, 1], transition: { duration: 0.3, repeat: 2 } } }} />
  </svg>
);

// ─── Database Icon ─────────────────────────────────────────────────────────
export const AnimatedDatabase = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.ellipse
      cx="12" cy="5" rx="9" ry="3"
      variants={{ hover: { scaleY: [1, 1.2, 1], transition: { duration: 0.4 } } }}
    />
    <motion.path
      d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"
      variants={{ hover: { y: [0, 2, 0], transition: { duration: 0.4, delay: 0.1 } } }}
    />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

// ─── Tools / Workflow Icon ─────────────────────────────────────────────────
export const AnimatedTools = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      variants={{
        hover: {
          rotate: [0, 20, -20, 0],
          originX: '12px',
          originY: '12px',
          transition: { duration: 0.5 }
        }
      }}
    />
  </svg>
);

// ─── Bot / AI Icon ─────────────────────────────────────────────────────────
export const AnimatedBot = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <motion.circle cx="8.5" cy="16" r="1.5" fill="currentColor" variants={{ hover: { scale: [1, 1.4, 1], transition: { duration: 0.3 } } }} />
    <motion.circle cx="15.5" cy="16" r="1.5" fill="currentColor" variants={{ hover: { scale: [1, 1.4, 1], transition: { duration: 0.3 } } }} />
    <motion.path
      d="M12 2v4M8 6h8"
      variants={{
        hover: {
          y: [-1, 1, -1],
          transition: { duration: 0.4 }
        }
      }}
    />
  </svg>
);

// ─── Zap / Flash Icon ──────────────────────────────────────────────────────
export const AnimatedZap = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.polygon
      points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
      variants={{
        hover: {
          scale: [1, 1.15, 1],
          rotate: [0, -6, 6, 0],
          transition: { duration: 0.4 }
        }
      }}
    />
  </svg>
);

// ─── Globe / Web App Icon ──────────────────────────────────────────────────
export const AnimatedGlobe = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <motion.line x1="2" y1="12" x2="22" y2="12" variants={{ hover: { scaleX: [1, 1.1, 1], transition: { duration: 0.4 } } }} />
    <motion.path
      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      variants={{
        hover: {
          scaleY: [1, 1.1, 1],
          transition: { duration: 0.4 }
        }
      }}
    />
  </svg>
);

// ─── Heart Pulse / Healthcare Icon ─────────────────────────────────────────
export const AnimatedHeartPulse = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
      variants={{
        hover: {
          scale: [1, 1.15, 1],
          transition: { duration: 0.4, repeat: 1 }
        }
      }}
    />
    <motion.polyline
      points="6 12 9 12 11 8 13 16 15 12 18 12"
      variants={{
        hover: {
          pathLength: [0, 1],
          transition: { duration: 0.5 }
        }
      }}
    />
  </svg>
);

// ─── Box / Inventory Icon ──────────────────────────────────────────────────
export const AnimatedBox = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      variants={{
        hover: {
          y: [-2, 2, -2],
          transition: { duration: 0.5 }
        }
      }}
    />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

// ─── Cloud Sun / Weather Icon ──────────────────────────────────────────────
export const AnimatedCloudSun = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
      variants={{
        hover: {
          rotate: 45,
          transition: { duration: 0.5 }
        }
      }}
    />
    <path d="M17.5 19H9a5 5 0 1 1 4.9-6.07A4.5 4.5 0 0 1 17.5 19z" />
  </svg>
);

// ─── Close / Remove Icon ───────────────────────────────────────────────────
export const AnimatedClose = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.line
      x1="18" y1="6" x2="6" y2="18"
      variants={{ hover: { rotate: 90, transition: { duration: 0.2 } } }}
    />
    <motion.line
      x1="6" y1="6" x2="18" y2="18"
      variants={{ hover: { rotate: 90, transition: { duration: 0.2 } } }}
    />
  </svg>
);

