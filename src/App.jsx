import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills'; // Import Skills
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import AdminPage from './components/admin/AdminPage';

// Import the portfolio data directly
import portfolioDataRaw from './data/portfolio.json';

function PortfolioApp() {
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState(null); // State to hold portfolio data

  // Load portfolio data once when the component mounts
  useEffect(() => {
    // Since portfolioDataRaw is imported directly, it's already available.
    // We can set it to state immediately.
    setPortfolio(portfolioDataRaw);
  }, []); // Empty dependency array means this runs once on mount

  // Create a 3D perspective scroll effect for the main container
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const translateZ = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && portfolio && ( // Render only when not loading and portfolio data is available
        <div className="perspective-container overflow-x-hidden">
          <motion.div 
            className="preserve-3d min-h-screen"
            style={{ 
              rotateX,
              translateZ,
              transformOrigin: "top center"
            }}
          >
            <Navbar />
            <main className="relative z-10">
              <Hero />
              <Projects />
              {/* Pass the loaded data as props to the Skills component */}
              <Skills technologies={portfolio.technologies} specialization={portfolio.specialization} />
              <Contact />
            </main>
          </motion.div>
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
