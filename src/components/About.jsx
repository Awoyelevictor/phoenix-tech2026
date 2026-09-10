import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Terminal, 
  Headphones, 
  Gamepad2, 
  ExternalLink, 
  Flame
} from 'lucide-react';

const defaultParagraphs = [
  "I’m Awoyele Victor Ayomide, a Computer Science student and software developer passionate about building practical, modern digital solutions.",
  "My main focus is frontend development, where I work with technologies like React.js, JavaScript, Tailwind CSS, and modern web APIs to create responsive and user-friendly experiences. I also enjoy working with Node.js, Laravel, MongoDB, MySQL, and REST APIs to understand and build complete systems beyond the interface.",
  "I’m particularly interested in Artificial Intelligence, Natural Language Processing, and Cybersecurity. I enjoy exploring how AI can solve real-world problems and how secure, intelligent systems can make technology more accessible and useful.",
  "I believe good software should not only look good — it should solve a real problem, work reliably, and be built with purpose. I’m constantly learning, experimenting with new technologies, and turning ideas into working projects."
];

const About = ({ aboutData }) => {
  const paragraphs = Array.isArray(aboutData?.paragraphs) && aboutData.paragraphs.length > 0 
    ? aboutData.paragraphs 
    : defaultParagraphs;

  const musicTitle = aboutData?.faveMusic?.title || "🎧 My Fave";
  const musicSubtitle = aboutData?.faveMusic?.subtitle || "Vibes & Coding Soundtrack";
  const musicDesc = aboutData?.faveMusic?.description || "A little window into my taste — the songs I keep coming back to while coding, building, thinking, or just vibing.";
  const spotifyUrl = aboutData?.faveMusic?.url || aboutData?.faveMusic?.playlistUrl || "https://open.spotify.com/playlist/2yiM4AjKi0kROd1S4QOuAI";
  const spotifyEmbedUrl = aboutData?.faveMusic?.embedUrl || "https://open.spotify.com/embed/playlist/2yiM4AjKi0kROd1S4QOuAI?utm_source=generator&theme=0";

  const gameTitle = aboutData?.faveGame?.title || "Blood Strike";
  const gameTag = aboutData?.faveGame?.tag || "FPS Battle Royale";
  const gameDesc = aboutData?.faveGame?.description || "Fast-paced matches, chaotic gunfights, and just enough 'one more game' energy to destroy a perfectly good sleep schedule. 😭🎮";

  const focusPills = [
    { label: "Frontend & UI Engineering", icon: Terminal, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { label: "Full-Stack Web Systems", icon: Terminal, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
    { label: "AI & NLP Solutions", icon: Terminal, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { label: "Cybersecurity & Logic", icon: Terminal, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  ];

  return (
    <section id="about" className="py-28 px-6 relative z-10 max-w-7xl mx-auto overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-4"
        >
          <Sparkles size={14} />
          <span>About Me</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-textPrimary tracking-tight max-w-3xl"
        >
          Passionate Developer. <br className="hidden sm:inline" />
          <span className="text-gradient-accent">Purposeful Engineering.</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-textSecondary text-sm sm:text-base max-w-2xl mt-4 font-normal"
        >
          A deeper look into who I am, how I build digital experiences, and the things that inspire my work.
        </motion.p>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Narrative & Focus (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Main Bio Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-charcoal/60 border border-white/[0.08] backdrop-blur-xl relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider">
                Software Developer • Nigeria
              </span>
            </div>

            <div className="space-y-4 text-textSecondary text-sm sm:text-base leading-relaxed font-normal">
              {paragraphs.map((p, idx) => (
                <p 
                  key={idx} 
                  className={idx === 0 ? "text-textPrimary font-medium text-base sm:text-lg" : (idx === paragraphs.length - 1 ? "border-l-2 border-accent/40 pl-4 italic text-textMuted text-xs sm:text-sm my-2" : "")}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Core Competencies Badges */}
            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <p className="text-xs font-semibold uppercase tracking-wider text-textMuted mb-3">Key Focus Areas</p>
              <div className="flex flex-wrap gap-2.5">
                {focusPills.map((pill, i) => {
                  const Icon = pill.icon;
                  return (
                    <div
                      key={i}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-medium ${pill.color} transition-all duration-200 hover:scale-[1.02]`}
                    >
                      <Icon size={14} />
                      <span>{pill.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </motion.div>

        {/* Right Column: Interactive Bento Cards (Fave Music & Game) (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Card 1: 🎧 My Fave (Spotify Playlist) */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#121212] to-charcoal border border-[#1DB954]/25 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#1DB954]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#1DB954]/20 text-[#1DB954] flex items-center justify-center">
                  <Headphones size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1DB954]">{musicTitle}</span>
                  </div>
                  <h3 className="text-base font-bold text-textPrimary leading-tight">{musicSubtitle}</h3>
                </div>
              </div>

              {/* Animated Audio Equalizer Bars */}
              <div className="flex items-end gap-1 h-5 px-2">
                <span className="w-1 bg-[#1DB954] rounded-full animate-[bounce_1s_infinite_100ms] h-3" />
                <span className="w-1 bg-[#1DB954] rounded-full animate-[bounce_1s_infinite_300ms] h-5" />
                <span className="w-1 bg-[#1DB954] rounded-full animate-[bounce_1s_infinite_200ms] h-4" />
                <span className="w-1 bg-[#1DB954] rounded-full animate-[bounce_1s_infinite_400ms] h-2" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-textSecondary leading-relaxed mb-5">
              {musicDesc}
            </p>

            {/* Embedded Spotify Compact Player */}
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-inner bg-black/40 mb-4">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src={spotifyEmbedUrl} 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Victor's Spotify Playlist"
              />
            </div>

            {/* External Spotify Button */}
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-[#1DB954]/20"
            >
              <span>Listen on Spotify</span>
              <ExternalLink size={15} />
            </a>
          </div>

          {/* Card 2: 🎮 Favorite Game */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-charcoal via-charcoal to-red-950/20 border border-red-500/25 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center">
                  <Gamepad2 size={20} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">🎮 Favorite Game</span>
                  <h3 className="text-base font-bold text-textPrimary leading-tight">{gameTitle}</h3>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/15 text-red-400 text-[10px] font-bold uppercase tracking-wider border border-red-500/30">
                <Flame size={12} />
                <span>{gameTag}</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] mb-4">
              <p className="text-xs sm:text-sm text-textPrimary leading-relaxed italic">
                “{gameDesc}”
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/[0.05] text-textSecondary border border-white/5">
                ⚡ Fast-Paced Combat
              </span>
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/[0.05] text-textSecondary border border-white/5">
                🎯 Tactical Gunplay
              </span>
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/[0.05] text-textSecondary border border-white/5">
                🔥 High Adrenaline
              </span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default About;
