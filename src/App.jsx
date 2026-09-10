import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import VisitorStats from './components/VisitorStats';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import AdminPage from './components/admin/AdminPage';

// Import local fallback data
import portfolioDataRaw from './data/portfolio.json';
import { getSiteContent, getProjects, recordPageView } from './utils/api';

const normalizeProjects = (rawList) => {
  if (!Array.isArray(rawList)) return [];
  return rawList.map((p, idx) => ({
    ...p,
    name: p?.name || `Project ${idx + 1}`,
    technologies: Array.isArray(p?.technologies)
      ? p.technologies
      : (typeof p?.technologies === 'string'
          ? p.technologies.split(',').map(t => t.trim()).filter(Boolean)
          : [])
  }));
};

function PortfolioApp() {
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState(() => {
    let initial = { ...portfolioDataRaw };
    try {
      const savedContent = localStorage.getItem('portfolio_live_content');
      const savedProjects = localStorage.getItem('portfolio_live_projects');
      if (savedContent) {
        initial = { ...initial, ...JSON.parse(savedContent) };
      }
      if (savedProjects) {
        const parsedP = JSON.parse(savedProjects);
        if (Array.isArray(parsedP) && parsedP.length > 0) {
          const sanitized = normalizeProjects(parsedP);
          initial.projects = sanitized;
          initial.featuredProjects = sanitized.filter(p => p.featured).map(p => p.name);
        }
      }
    } catch (e) {
      console.debug('Failed reading cached portfolio data:', e);
    }
    return initial;
  });

  useEffect(() => {
    // Fetch live content and projects from MongoDB backend or localStorage
    const loadLiveData = async () => {
      try {
        let updatedData = { ...portfolioDataRaw };
        const savedContent = localStorage.getItem('portfolio_live_content');
        const savedProjects = localStorage.getItem('portfolio_live_projects');

        if (savedContent) {
          try {
            updatedData = { ...updatedData, ...JSON.parse(savedContent) };
          } catch (e) { /* ignore */ }
        }

        if (savedProjects) {
          try {
            const parsedP = JSON.parse(savedProjects);
            if (Array.isArray(parsedP) && parsedP.length > 0) {
              const sanitized = normalizeProjects(parsedP);
              updatedData.projects = sanitized;
              updatedData.featuredProjects = sanitized.filter(p => p.featured).map(p => p.name);
            }
          } catch (e) { /* ignore */ }
        }

        setPortfolio(updatedData);

        const [liveContent, liveProjects] = await Promise.allSettled([
          getSiteContent(),
          getProjects()
        ]);

        if (liveContent.status === 'fulfilled' && liveContent.value && Object.keys(liveContent.value).length > 0) {
          updatedData = { ...updatedData, ...liveContent.value };
          localStorage.setItem('portfolio_live_content', JSON.stringify(updatedData));
        }

        if (liveProjects.status === 'fulfilled' && Array.isArray(liveProjects.value) && liveProjects.value.length > 0) {
          const sanitized = normalizeProjects(liveProjects.value);
          updatedData.projects = sanitized;
          updatedData.featuredProjects = sanitized.filter(p => p.featured).map(p => p.name);
          localStorage.setItem('portfolio_live_projects', JSON.stringify(sanitized));
        }

        setPortfolio(updatedData);
      } catch (err) {
        console.debug('Using local portfolio data fallback:', err);
      }
    };

    loadLiveData();

    const handleStorageChange = () => loadLiveData();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
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
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="relative min-h-screen bg-darkBg text-textPrimary selection:bg-accent/30 selection:text-white">
        {/* Top Parallax Scroll Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent via-purple-500 to-cyan-400 origin-left z-[100] shadow-[0_0_12px_rgba(99,102,241,0.6)]"
          style={{ scaleX }}
        />

        <Navbar />
        
        <main className="relative z-10">
          <Hero />
          
          <About 
            aboutData={portfolio?.about}
            phone={portfolio?.phone}
            whatsapp={portfolio?.whatsapp}
          />

          <Projects 
            projects={portfolio?.projects} 
            featuredProjects={portfolio?.featuredProjects} 
          />
          
          <Skills 
            technologies={portfolio?.technologies} 
            specialization={portfolio?.specialization}
            experience={portfolio?.experience}
            careerGoals={portfolio?.careerGoals}
          />
          
          <Contact 
            socials={portfolio?.socials} 
          />
          <VisitorStats />
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<PortfolioApp />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/adminpage" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;


