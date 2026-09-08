import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { getAnalytics, recordPageView } from '../utils/api';
import { Activity, Globe2, Users } from 'lucide-react';

// Odometer Counter Component
const AnimatedCounter = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(0, {
    damping: 50,
    stiffness: 100,
    mass: 1
  });

  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, value, springValue]);

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    return springValue.onChange((latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  // Pad with leading zeros for digital clock effect
  const paddedValue = displayValue.toString().padStart(5, '0');

  return (
    <div ref={ref} className="flex gap-1">
      {paddedValue.split('').map((char, i) => (
        <div 
          key={i} 
          className="w-8 h-12 md:w-10 md:h-16 bg-charcoal border border-white/10 rounded-lg flex items-center justify-center text-2xl md:text-4xl font-bold text-accent shadow-inner relative overflow-hidden"
        >
          <motion.div
            key={char + i}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {char}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

const VisitorStats = () => {
  const [stats, setStats] = useState({ totalViews: 0, countryBreakdown: {} });
  const [loading, setLoading] = useState(true);
  const hasRecorded = useRef(false);

  useEffect(() => {
    const initAnalytics = async () => {
      if (hasRecorded.current) return;
      hasRecorded.current = true;

      try {
        // 1. Get Country via IP
        let country = 'Unknown';
        try {
          const ipRes = await fetch('https://ipapi.co/json/');
          if (ipRes.ok) {
            const ipData = await ipRes.json();
            country = ipData.country || 'Unknown';
          }
        } catch (ipErr) {
          console.debug('Adblocker or network blocked IP lookup');
        }

        // 2. Record View
        await recordPageView(country);

        // 3. Fetch Analytics
        const analyticsData = await getAnalytics();
        setStats({
          totalViews: analyticsData?.totalViews || 0,
          countryBreakdown: analyticsData?.countryBreakdown || {}
        });
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    };

    initAnalytics();
  }, []);

  const topCountries = Object.entries(stats.countryBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <section className="py-20 px-6 relative z-10 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-charcoal/50 border border-white/[0.08] rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Left Side: Odometer */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider">
            <Activity size={14} />
            <span>Live Portfolio Analytics</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight text-center md:text-left">
            Total Global Views
          </h3>
          
          <div className="mt-4">
            <AnimatedCounter value={stats.totalViews} />
          </div>
        </div>

        {/* Right Side: Countries Breakdown */}
        <div className="w-full md:w-auto bg-darkBg/80 p-6 rounded-2xl border border-white/5 shadow-xl relative z-10">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
            <Globe2 className="text-purple-400" size={20} />
            <h4 className="font-bold text-textPrimary">Top Visitor Locations</h4>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {topCountries.length > 0 ? (
              topCountries.map(([code, count]) => (
                <div key={code} className="flex items-center justify-between gap-4">
                  <span className="text-textSecondary font-semibold text-sm flex items-center gap-2">
                    {code !== 'Unknown' && code.length === 2 ? (
                      <img src={`https://flagcdn.com/20x15/${code.toLowerCase()}.png`} alt={code} className="rounded-sm" />
                    ) : (
                      <Users size={14} />
                    )}
                    {code}
                  </span>
                  <span className="text-accent font-bold">{count}</span>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-textMuted text-sm italic">
                {loading ? 'Loading...' : 'Gathering location data...'}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default VisitorStats;
