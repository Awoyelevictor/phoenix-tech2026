import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ${
        scrolled 
          ? 'bg-darkBg/70 backdrop-blur-xl border-b border-white/[0.04]' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo — minimal */}
        <a href="#home" className="text-lg font-semibold tracking-tight text-textPrimary">
          dev<span className="text-textMuted/40">.</span>
        </a>
        
        {/* Nav links */}
        <nav>
          <ul className="flex items-center gap-8">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href}
                  className="relative text-[13px] font-medium text-textMuted hover:text-textPrimary transition-colors duration-500 tracking-wide uppercase group"
                >
                  {link.name}
                  {/* Minimal dot indicator on hover */}
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 bg-textMuted/40 rounded-full transition-all duration-500 group-hover:w-1 group-hover:h-1" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}

export default Navbar;