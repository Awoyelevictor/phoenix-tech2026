import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import AdminPage from './components/admin/AdminPage';

// Import the portfolio data directly
import portfolioDataRaw from './data/portfolio.json';

function PortfolioApp() {
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState(portfolioDataRaw);

  useEffect(() => {
    setPortfolio(portfolioDataRaw);
  }, []);

  // Smooth scroll progress bar across the entire page
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && portfolio && (
        <div className="relative min-h-screen bg-darkBg text-textPrimary selection:bg-accent/30 selection:text-white">
          {/* Top Parallax Scroll Progress Bar */}
          <motion.div 
            className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent via-purple-500 to-cyan-400 origin-left z-[100] shadow-[0_0_12px_rgba(99,102,241,0.6)]"
            style={{ scaleX }}
          />

          <Navbar />
          
          <main className="relative z-10">
            <Hero />
            
            <Projects 
              projects={portfolio.projects} 
              featuredProjects={portfolio.featuredProjects} 
            />
            
            <Skills 
              technologies={portfolio.technologies} 
              specialization={portfolio.specialization}
              experience={portfolio.experience}
              careerGoals={portfolio.careerGoals}
            />
            
            <Contact 
              socials={portfolio.socials} 
            />
          </main>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioApp />} />
        <Route path="/adminpage" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;

