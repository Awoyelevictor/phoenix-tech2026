import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import AdminPage from './components/admin/AdminPage';

function PortfolioApp() {
  const [loading, setLoading] = useState(true);
  
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

      {!loading && (
        <div className="perspective-container h-screen overflow-x-hidden overflow-y-auto">
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
              <Skills />
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
